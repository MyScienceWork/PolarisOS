// @flow
const Logger = require('../../../logger');
const ODM = require('../crud/odm');
const EntitiesUtils = require('../../utils/entities');

class Form extends ODM {
    static generate_sort(sort) {
        if (!sort || sort.length === 0) {
            return {};
        }

        const fc = sort[0];
        if (fc === '-') {
            return { [sort.slice(1)]: 'desc' };
        }
        return { [sort]: 'asc' };
    }

    async post_read_hook(population: Array<String>) {
        await this._handle_population(population, true);

        const info = this.source;
        if (!('fields' in info)) {
            return;
        }

        if (!population.some(p => p.indexOf('datasource') !== -1)) {
            return;
        }

        // Collect subforms and datasources to be expanded.
        const datasources = info.fields.reduce((obj, field, i) => {
            if (field.datasource != null && field.datasource.name != null
                    && field.datasource.name !== '' &&
                !field.datasource.fetch_from_sink) {
                const name = field.datasource.name;
                const label = field.datasource.label;
                const value = field.datasource.value;
                const sort = field.datasource.sort;
                if (name in obj) {
                    obj[name].indices.push(i);
                    obj[name].projection.add(label);
                    obj[name].projection.add(value);
                    obj[name].sort = sort;
                } else {
                    obj[name] = { indices: [i], projection: new Set([label, value]), sort };
                }
            }
            return obj;
        }, { });

        for (const ds in datasources) {
            try {
                const sort = Form.generate_sort(datasources[ds].sort);
                const datasource = await EntitiesUtils.search(ds, {
                    projection: Array.from(datasources[ds].projection),
                    size: 800,
                    sort: [sort, { _uid: 'desc' }],
                });

                if ('hits' in datasource.result) {
                    const indices = datasources[datasource.entity].indices;
                    indices.forEach((i) => {
                        this._db.source.fields[i].datasource.content =
                            datasource.result.hits.map(h => h.source);
                    });
                }
            } catch (err) {
                Logger.error(`Unable to find datasource ${ds}`);
                Logger.error(err);
            }
        }
    }
}

module.exports = Form;
