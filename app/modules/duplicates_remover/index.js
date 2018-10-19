// @flow
const EntitiesUtils = require('../utils/entities');

class DuplicatesRemover {
    _type: string;

    constructor(type: string) {
        this._type = type;
    }

    _consolidate_duplicates(duplicates: Array<Object>): Array<Object> {
        /* const new_duplicates = []
        for(const i in duplicates){
            const left = duplicates[i];

            for(const j in duplicates){
                if(i === j){
                    continue
                }

                const right = duplicates[j];

                const common = left.duplicates.find(d => d._id === right.source._id)
                    || right.duplicates.find(d => d._id === left.source._id)

                if(!common){
                   continue;
                }
                console.error('Duplicates need to be consolidated');
            }
        }*/
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

    async find_duplicates(fields: Array<string>, minimum_should_matches: Object) {
        let search_after;
        const duplicates = [];
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

        console.log(JSON.stringify(duplicates));
    }
}

module.exports = DuplicatesRemover;
