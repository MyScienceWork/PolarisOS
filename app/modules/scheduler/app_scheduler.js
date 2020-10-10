// @flow
const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');
const Scheduler = require('./scheduler');
const Logger = require('../../logger');
const Errors = require('../exceptions/errors');
const EntitiesUtils = require('../utils/entities');
const RISPipeline = require('../entities/importer/pipelines/ris_pipeline');
const EndNotePipeline = require('../entities/importer/pipelines/endnote_pipeline');
const ImporterReaders = require('../entities/importer/readers');
const Importer = require('../entities/importer/importing');
const MyControllerMasas = require('../../modules/entities/exporter/controllers/masas');


class AppScheduler extends Scheduler {
    constructor(interval: number) {
        super(interval);
    }

    async _execute_import() {
        const on_wait_imports = await EntitiesUtils.search_and_get_sources('system_report', {
            where: {
                $and: [{ type: 'import' }, { status: 'on_wait' }],
            },
            sort: ['created_at'],
        });

        const in_progress_imports = await EntitiesUtils.search_and_get_sources('system_report', {
            where: {
                $and: [{ type: 'import' }, { status: 'in_progress' }],
            },
        });

        if (in_progress_imports.length > 0) {
            return; // We don't run multiple import at the same, to costly
        }

        if (on_wait_imports.length === 0) {
            return;
        }

        const to_import = on_wait_imports[0];

        const format = to_import.format;
        let pipeline = '';
        let reader = '';

        switch (format) {
        case 'ris':
            pipeline = RISPipeline;
            reader = ImporterReaders.RISReader;
            break;
        case 'endnote':
            pipeline = EndNotePipeline;
            reader = ImporterReaders.EndNoteReader;
            break;
        case 'excel':
            // pipeline = ExcelPipeline;
            // reader = ImporterReaders.ExcelReader;
            break;
        default:
            throw Error('format importer not recognized');
        }


        const importer = new Importer(to_import.subtype, pipeline,
            pipeline.queries, reader, pipeline.post_queries);

        await importer.read_report(to_import._id);
        await importer.import_items();
    }

    async _execute_masas() {
        const on_wait_masas = await EntitiesUtils.search_and_get_sources('system_report', {
            where: {
                $and: [{ type: 'masas' }, { status: 'on_wait' }],
            },
            sort: ['created_at'],
        });

        const in_progress_masas = await EntitiesUtils.search_and_get_sources('system_report', {
            where: {
                $and: [{ type: 'masas' }, { status: 'in_progress' }],
            },
        });

        if (in_progress_masas.length > 0) {
            return; // We don't run multiple import at the same, to costly
        }

        if (on_wait_masas.length === 0) {
            return;
        }

        const to_process = JSON.parse(on_wait_masas[0].external_information);

        const format = to_process.format;
        const date = to_process.date;
        const where = to_process.where;
        const sort = to_process.sort;

        const body = on_wait_masas[0];
        body.status = 'in_progress';
        body.external_information = JSON.stringify(to_process);
        await EntitiesUtils.update(_.cloneDeep(body), 'system_report');

        const pub_results = await EntitiesUtils.search_and_get_sources('publication', {
            where,
            size: 10000, // size[0],
            sort,
        });

        const results = await MyControllerMasas.transform_to_masas(pub_results, format, { lang: 'FR' });

        fs.writeFile(`/tmp/export${date}.xlsx`, results, (err) => {
            if (err) {
                Logger.error('error : ', err);
            }
        });

        body.status = 'done';
        body.external_information = JSON.stringify(to_process);
        await EntitiesUtils.update(_.cloneDeep(body), 'system_report');
    }

    async _execute_data() {
        console.log('execute app scheduler');
        this._execute_import().then(() => {}).catch((err) => {
            Logger.error('Error when running import');
            Logger.error(err);
        });
        this._execute_masas().then(() => {}).catch((err) => {
            Logger.error('Error when running masas');
            Logger.error(err);
        });
        /* this._execute_sms_sending().then(() => {}).catch((err) => {
            Logger.error('Error when sending SMS through scheduler');
            Logger.error(err);
        });*/
    }
}

module.exports = AppScheduler;
