// @flow
const _ = require('lodash');
const moment = require('moment');
const Pipeline = require('../../pipeline/pipeline');
const EntitiesUtils = require('../../utils/entities');
const Utils = require('../../utils/utils');
const Errors = require('../../exceptions/errors');
const Logger = require('../../../logger');

class Importer {
    _items_type: string;
    _import_pipeline: Object;
    _read_func: Function;
    _extra: ?Object;
    _reference_queries: Object;
    _post_queries: Object;
    _max_size_per_query: number;
    _report: ?Object;

    constructor(items_type: string,
        import_pipeline: Object,
        reference_queries: Object,
        read_func: Function,
        post_queries: Object) {
        this._items_type = items_type;
        this._import_pipeline = import_pipeline;
        this._read_func = read_func;
        this._reference_queries = reference_queries;
        this._post_queries = post_queries;
        this._max_size_per_query = 2;
        this._report = null;
        this._extra = null;
    }

    get report(): ?Object {
        return this._report;
    }

    async _import_data(items: Array<Object>): Promise<any> {
        const method = 'POST';
        const model = await EntitiesUtils.get_model_from_type(this._items_type);
        const presults = await Pipeline.run_bulk(items,
            this._items_type, method, model, this._extra || {});

        if ('total' in presults && 'errors_count' in presults) {
            return presults;
        }

        const res = { total: 0, success: 0, errors_count: 0, results: [] };
        const results = [];
        for (let i = 0, len = presults.length; i < len; i++) {
            const chunk = presults[i];
            res.total += chunk.length;
            if ('change' in chunk[0] || chunk[0].error) {
                chunk[0].title = items[i].title.content;
                results.push(chunk);
                res.errors_count += chunk.length;
            } else {
                const response = await EntitiesUtils.creates(chunk, this._items_type);
                if (response.errors) {
                    response.items.forEach((item) => {
                        if (!item.index.created) {
                            res.errors_count += 1;
                        }
                    });
                }
                results.push(response.items);
            }
        };

        res.results = _.flatten(results);
        res.success = res.total - res.errors_count;
        return res;
    }

    async _fill_references_maps(maps: Object): Promise<Object> {
        const filled_maps = {};
        for (const name in maps) {
            const map = maps[name];
            const query = this._reference_queries[name];
            if (!query) {
                continue;
            }
            filled_maps[name] = map;

            let sources = {};
            for (const value in map) {
                sources = await EntitiesUtils.search_and_get_sources(name, {
                    projection: [],
                    where: await query(value),
                    size: this._max_size_per_query,
                    sort: ['-_score'],
                });

                if (sources.length === 0) {
                    const post_query = this._post_queries[name];
                    sources = [await EntitiesUtils.create(await post_query(value), name)];
                }
                filled_maps[name][value].ids = sources.map(src => src._id);
            }
        }
        return filled_maps;
    }

    static async _merge_references_and_items(items: Array<Object>,
        maps: Object): Promise<Array<Object>> {
        _.forEach(maps, (map) => {
            _.forEach(map, (obj) => {
                const { ids, refs } = obj;
                if (ids.length === 0) {
                    return;
                }

                refs.forEach((ref) => {
                    const item = items[ref.idx];
                    const path = ref.path.split('.');
                    const last_segment = parseInt(path[path.length - 1], 10) || path[path.length - 1];
                    const value = Utils.find_object_with_path(item, path);
                    if (value) {
                        value[last_segment] = ids[0];
                    }
                });
            });
        });
        return items;
    }

    async _execute_pipeline(items: Array<Object>): Promise<Array<any>> {
        const results = [];
        const typology = (await EntitiesUtils.search_and_get_sources('typology', {
            size: 100,
        })).reduce((obj, typo) => {
            obj[typo.name] = typo;
            return obj;
        }, {});

        const maps = {};
        let idx = 0;
        for (const item of items) {
            try {
                const new_item = await this._import_pipeline.run(item, typology, idx, maps);
                results.push(new_item);
            } catch (err) {
                Logger.error('Error when executing pipeline during import');
                Logger.error(err);
            }
            idx += 1;
        }
        return [results, maps];
    }

    async _set_import_in_progress() {
        if (!this._report) {
            return;
        }
        this._report.status = 'in_progress';
        await EntitiesUtils.update(_.cloneDeep(this._report), 'system_report');
    }

    async _set_import_to_fail() {
        if (!this._report) {
            return;
        }
        this._report.status = 'failed';
        await EntitiesUtils.update(_.cloneDeep(this._report), 'system_report');
    }

    async _set_final_information_on_report(results: Array<Object>) {
        if (!results) {
            return;
        }

        if (!this._report) {
            return;
        }

        this._report.status = 'done';
        this._report.report.total = results.total;
        this._report.report.success = results.success;
        this._report.report.errors = results.errors_count;
        this._report.result = JSON.stringify(results.results);
        await EntitiesUtils.update(_.cloneDeep(this._report), 'system_report');
    }

    static async create_report(name: string,
        filepath: string,
        format: string,
        items_type: string,
        extra: Object): Promise<Object> {
        const report_body = {
            name,
            created_at: +moment.utc(),
            type: 'import',
            subtype: items_type,
            filepath,
            format,
            report: {
                total: 0,
                success: 0,
                errors: 0,
            },
            differed: false,
            schedule_at: 0,
            status: 'on_wait',
            requester: extra.papi._id,
            external_information: JSON.stringify(extra),
            denormalization: {
                requester: {
                    fullname: extra.papi.fullname,
                },
            },
        };

        const report = await EntitiesUtils.create(report_body, 'system_report');
        if (!report) {
            throw Errors.UnableToCreateReport;
        }

        return report;
    }

    async read_report(id: string): Promise<Object> {
        const report = await EntitiesUtils.retrieve_and_get_source('system_report', id);
        if (!report) {
            throw Errors.UnableToCreateReport;
        }

        this._report = report;
        this._extra = JSON.parse(report.external_information || '{}');
        return this._report;
    }

    async import_items() {
        if (!this._report) {
            return;
        }

        await this._set_import_in_progress();

        try {
            const items_in_json = await this._read_func(this._report.filepath);
            this._report.report.total = items_in_json.length;
            await EntitiesUtils.update(_.cloneDeep(this._report), 'system_report');

            const [items_without_references, references_maps] =
                await this._execute_pipeline(items_in_json);

            const filled_references_maps = await this._fill_references_maps(references_maps);

            const final_items = await Importer._merge_references_and_items(items_without_references,
                filled_references_maps);

            const results = await this._import_data(final_items);
            await this._set_final_information_on_report(results);
        } catch (err) {
            await this._set_import_to_fail();
        }
    }
}

module.exports = Importer;
