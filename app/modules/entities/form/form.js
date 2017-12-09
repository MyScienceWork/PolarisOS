// @flow
const ODM = require('../crud/odm');
const EntitiesUtils = require('../../utils/entities');

class Form extends ODM {
    async post_read_hook(population: Array<String>) {
        await this._handle_population(population);

        const info = this.source;
        if (!('fields' in info)) {
            return;
        }

        // Collect subforms and datasources to be expanded.
        const datasources = info.fields.reduce((obj, field, i) => {
            if (field.datasource != null && field.datasource.name != null
                    && field.datasource.name !== '') {
                const name = field.datasource.name;
                const label = field.datasource.label;
                const value = field.datasource.value;
                if (name in obj) {
                    obj[name].indices.push(i);
                    obj[name].projection.add(label);
                    obj[name].projection.add(value);
                } else {
                    obj[name] = { indices: [i], projection: new Set([label, value]) };
                }
            }
            return obj;
        }, { });

        const all_datasources = await Promise.all(Object.keys(datasources)
        .map(ds => EntitiesUtils.search(ds, {
            projection: Array.from(datasources[ds].projection),
            size: 500,
        })));

        all_datasources.forEach((datasource) => {
            if ('hits' in datasource.result) {
                const indices = datasources[datasource.entity].indices;
                indices.forEach((i) => {
                    this._db.source.fields[i].datasource.content =
                        datasource.result.hits.map(h => h.source);
                });
            }
        });
    }
}

module.exports = Form;
