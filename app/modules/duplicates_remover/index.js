// @flow
const _ = require('lodash');
const EntitiesUtils = require('../utils/entities');
const Pipeline = require('../pipeline/pipeline');

class DuplicatesRemover {
    _type: string;

    constructor(type: string) {
        this._type = type;
    }

    _consolidate_duplicates(duplicates: Array<Object>): Array<Object> {
        let cloned_duplicates = [];
        const clean_duplicates = [];
        while (duplicates.length > 0) {
            const left = duplicates.shift();
            duplicates.forEach((right) => {
                const left_ids = new Set(left.duplicates.map(d => d._id));
                const common = left.duplicates.find(d => d._id === right.source._id)
                    || right.duplicates.find(d => d._id === left.source._id);

                if (!common) {
                    cloned_duplicates.push(right);
                    return;
                }

                const keep_right_duplicates = right.duplicates
                    .filter(d => !left_ids.has(d._id) && d._id !== left.source._id);
                left.duplicates = left.duplicates.concat(keep_right_duplicates);
            });
            clean_duplicates.push(left);
            duplicates = cloned_duplicates;
            cloned_duplicates = [];
        }
        return clean_duplicates;
    }

    async _search_for_duplicates(info: Object, q: Object): Promise<?Object> {
        const query = {
            size: 5,
            where: q,
        };
        const results = await EntitiesUtils.search_and_get_sources(this._type, query);
        const filtered_results = results.filter(r => r._id !== info._id);

        if (filtered_results.length === 0) {
            return null;
        }

        return {
            source: info,
            duplicates: filtered_results,
        };
    }

    async _bulk_modify(type: string, objects: Array<Object>, extra: Object): Promise<any> {
        const model = await EntitiesUtils.get_model_from_type(type);
        const method = 'PUT';
        const presults = await Pipeline.run_bulk(objects, type, method, model, extra);
        if ('total' in presults && 'errors_count' in presults) {
            return presults;
        }

        const res = { total: 0, success: 0, errors_count: 0, results: [] };
        const results = [];
        for (const chunk of presults) {
            res.total += chunk.length;
            if ('change' in chunk[0] || chunk[0].error) {
                results.push(chunk);
                res.errors_count += chunk.length;
            } else {
                const response = await EntitiesUtils.updates(chunk, type);
                if (response.errors) {
                    response.items.forEach((item) => {
                        if (!item.index.created) {
                            res.errors_count += 1;
                        }
                    });
                }
                results.push(response.items);
            }
        }

        res.results = _.flatten(results);
        res.success = res.total - res.errors_count;
        return res;
    }

    async find_duplicates(fields: Array<string>, minimum_should_matches: Object) {
        let search_after;
        let duplicates = [];
        let progress = 0;
        while (true) {
            const query = {
                size: 100,
                sort: [{ _uid: 'desc' }],
                search_after,
            };
            const results = await EntitiesUtils.search_and_get_sources(this._type, query);
            progress += results.length;
            if (results.length === 0) {
                break;
            }
            search_after = [`${this._type}#${results[results.length - 1]._id}`];


            for (const info of results) {
                const duplicates_query = {};

                duplicates_query.$and = fields.map((field) => {
                    if (!info[field] || info[field].trim() === '') {
                        return null;
                    }
                    return { [field]: { $match: { query: info[field],
                        minimum_should_match: minimum_should_matches[field] || '100%' } } };
                }).filter(q => q != null);

                if (duplicates_query.$and.length === 0) {
                    continue;
                }
                const dup_obj = await this._search_for_duplicates(info, duplicates_query);
                if (dup_obj) {
                    duplicates.push(dup_obj);
                }
            }

            console.error('Progress: ', progress, ' Duplicates: ', duplicates.length);
        }
        duplicates = this._consolidate_duplicates(duplicates);
        return duplicates;
    }

    async reorganize_duplicates(duplicates: Array<Object>, criteria: Function): Promise<Array<Object>> {
        const results = duplicates.map((duplicate) => {
            const result = criteria(duplicate.source, duplicate.duplicates);
            if (result) {
                result.confidence = 100;
                return result;
            }
            duplicate.confidence = 0;
            return duplicate;
        });

        const certains = results.filter(d => d.confidence === 100);
        console.error(`100% confidence: ${certains.length}`);
        console.log(JSON.stringify(certains));
        return certains;
    }


    async deduplicate(duplicates: Array<Object>, type: string, forger: Function, replacer: Function): Promise<any> {
        const to_replace = {};
        for (const duplicate of duplicates) {
            if (duplicate.confidence === 0) {
                continue;
            }

            const where = forger(duplicate);
            let search_after;
            while (true) {
                const query = {
                    size: 100,
                    sort: [{ _uid: 'desc' }],
                    search_after,
                    where,
                };

                const results = await EntitiesUtils.search_and_get_sources(type, query);
                if (results.length === 0) {
                    break;
                }
                search_after = [`${type}#${results[results.length - 1]._id}`];
                for (const info of results) {
                    if (info._id in to_replace) {
                        to_replace[info._id] = replacer(to_replace[info._id], duplicate);
                    } else {
                        to_replace[info._id] = replacer(info, duplicate);
                    }
                }
            }
        }
        console.error(`${type} to replace: ${Object.keys(to_replace).length}`);

        if (Object.keys(to_replace).length > 0) {
            const report = await this._bulk_modify(type, Object.values(to_replace), {});
            report.results = [];
            console.error(JSON.stringify(report));
            return { report, duplicates };
        }
        return { report: null, duplicates };
    }

    async remove_duplicates_after_verification(duplicates: Array<Object>,
        type: string, forger: Function): Promise<any> {
        let to_remove = [];
        for (const duplicate of duplicates) {
            if (duplicate.confidence === 0) {
                continue;
            }

            const where = forger(duplicate);
            const query = {
                size: 100,
                sort: [{ _uid: 'desc' }],
                where,
            };

            const results = await EntitiesUtils.search_and_get_sources(type, query);
            if (results.length === 0) {
                to_remove = to_remove.concat(duplicate.duplicates.map(d => d._id));
            } else {
                console.error('WARN: ', duplicate.source._id, '\' duplicates are still found in ', type);
            }
        }
        return to_remove;
    }
}

module.exports = DuplicatesRemover;
