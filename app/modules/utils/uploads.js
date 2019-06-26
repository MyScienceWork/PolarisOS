// @flow
const moment = require('moment');
const FS = require('fs');
const Errors = require('../exceptions/errors');
const MinioUtils = require('./minio');
const Archiver = require('archiver');
const EntitiesUtils = require('./entities');
const Utils = require('./utils');
const Logger = require('../../logger');
const PDFUtils = require('./pdf');
const ConfigUtils = require('./config');
const Handlebars = require('./templating');
const LangUtils = require('./lang');

async function generate_cover_page(publication: Object,
    file: Object, file_stream: any): Promise<any> {
    let coverStream = null;
    if (file.is_master && file.url.endsWith('.pdf')) {
        const my_config = await ConfigUtils.get_config();
        if (my_config) {
            const cover_page = Utils.find_value_with_path(my_config, 'gui.cover_page'.split('.'));
            if (cover_page) {
                const cover_page_html = Handlebars.compile(Handlebars.compile(cover_page)(publication))(publication);
                const translated_cover_page_html = await LangUtils.strings_to_translation(cover_page_html, 'EN');
                coverStream = await PDFUtils.transform_html_to_pdf(translated_cover_page_html);
            }
        }
    }

    if (coverStream) {
        const first_file_path = `/tmp/${+moment.utc()}_cover`;
        const second_file_path = `/tmp/${+moment.utc()}`;

        await new Promise((resolve, reject) => {
            const writableStream1 = FS.createWriteStream(first_file_path);
            coverStream.pipe(writableStream1);
            writableStream1.on('error', (err) => {
                writableStream1.close();
                reject(err);
            });
            writableStream1.on('finish', () => {
                writableStream1.close();
                resolve();
            });
        });

        await new Promise((resolve, reject) => {
            const writableStream2 = FS.createWriteStream(second_file_path);
            file_stream.pipe(writableStream2);
            writableStream2.on('error', (err) => {
                writableStream2.close();
                reject(err);
            });
            writableStream2.on('finish', () => {
                writableStream2.close();
                resolve();
            });
        });

        try {
            const mergedStream = await PDFUtils.merge_pdfs([first_file_path, second_file_path]);
            try {
                FS.unlinkSync(first_file_path);
                FS.unlinkSync(second_file_path);
            } catch (errfs) {}
            return mergedStream;
        } catch (err) {
            FS.unlinkSync(first_file_path);
            FS.unlinkSync(second_file_path);
            Logger.error('Error when merging pdfs');
            Logger.error(err);
            return file_stream;
        }
    } else {
        return file_stream;
    }
}

async function update_download_stats(info: Object, entity_type: string) {
    try {
        const stats_object = Utils.find_value_with_path(info, 'system.stats'.split('.'));
        if (stats_object) {
            if ('downloads' in stats_object) {
                info.system.stats.downloads += 1;
            } else {
                info.system.stats.downloads = 1;
            }
            await EntitiesUtils.update(info, entity_type);
        }

        await EntitiesUtils.create({
            date: +moment.utc(),
            eid: info._id,
            entity_type,
            stat_type: 'download',
        }, 'tracking_stat');
    } catch (err) {
        Logger.error('Error when updating the stats for download: ', entity_type, info._id);
        Logger.error(err);
    }
}

async function add_single(ctx) {
    const file = ctx.request.file;
    console.log(file);
    await MinioUtils.create_bucket_if_needed(MinioUtils.default_bucket);
    await MinioUtils.put_into_bucket(MinioUtils.default_bucket, file);

    try {
        FS.unlinkSync(file.path);
    } catch (errfs) {}
    ctx.body = { file: file.filename };
}

async function generic_download(ctx) {
    const entity = ctx.params.entity.trim();
    const eid = ctx.params.eid.trim();
    const filename = ctx.params.filename.trim();

    if (entity === '' || eid === '' || filename === '') {
        throw Errors.DownloadDoesNotExist;
    }

    const information = await EntitiesUtils.retrieve_and_get_source(entity, eid);
    if (!information) {
        throw Errors.DownloadDoesNotExist;
    }

    const shown_name = filename;
    const final_stream = await MinioUtils.retrieve_file(MinioUtils.default_bucket, filename);
    ctx.set('Content-disposition', `attachment; filename=${shown_name}`);
    ctx.statusCode = 200;
    ctx.body = final_stream;
}

async function download(ctx) {
    const entity = ctx.params.entity.trim();
    const eid = ctx.params.eid.trim();
    const filename = ctx.params.filename.trim();

    if (entity === '' || eid === '' || filename === '') {
        throw Errors.DownloadDoesNotExist;
    }

    const information = await EntitiesUtils.retrieve_and_get_source(entity, eid);
    if (!information) {
        throw Errors.DownloadDoesNotExist;
    }

    const files = Utils.find_value_with_path(information, 'files'.split('.'));

    if (!files) {
        throw Errors.DownloadDoesNotExist;
    }

    const file = files.find(f => f.url === filename);

    if (!file) {
        Logger.error(`Unable to find file with URI: ${filename}`);
        throw Errors.DownloadDoesNotExist;
    }

    const shown_name = file.name || file.url;
    const stream = await MinioUtils.retrieve_file(MinioUtils.default_bucket, filename);
    const final_stream = await generate_cover_page(information, file, stream);
    await update_download_stats(information, entity);

    ctx.set('Content-disposition', `attachment; filename=${shown_name}`);
    ctx.statusCode = 200;
    ctx.body = final_stream;
}

async function multi_download(ctx) {
    const body = ctx.params;
    const entity = body.entity || '';
    const eid = body.eid || '';
    const names = body.names ? body.names.split('|') : [];
    const filenames = body.filenames ? body.filenames.split('|') : [];


    if (entity === '' || eid === ''
        || filenames.length === 0 || names.length === 0
        || names.length !== filenames.length) {
        throw Errors.DownloadDoesNotExist;
    }

    const information = await EntitiesUtils.retrieve_and_get_source(entity, eid);
    if (!information) {
        throw Errors.DownloadDoesNotExist;
    }

    const archive = Archiver('zip', {
        zlib: { level: 1 }, // Sets the compression level.
    });

    for (const i in filenames) {
        const filename = filenames[i];
        const name = names[i];
        const my_file = (information.files.find(f => f.url === filename) || { is_master: false });
        const stream = await MinioUtils.retrieve_file(MinioUtils.default_bucket, filename);
        const final_stream = await generate_cover_page(information, my_file, stream);
        archive.append(final_stream, { name });
    }

    await update_download_stats(information, entity);
    ctx.set('Content-disposition', 'attachment; filename=pos_download.zip');
    ctx.statusCode = 200;
    ctx.body = archive;
    archive.finalize();
}

module.exports = {
    add_single,
    download,
    multi_download,
    generic_download,
};
