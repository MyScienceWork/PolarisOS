// @flow
const ODM = require('../crud/odm');
const EntitiesUtils = require('../../utils/entities');

class Form extends ODM {
    async post_read_hook() {
        console.log('run post read hook for form');
        const info = this.db;
        if (!info.source.has_subforms) {
            return;
        }

        // Collect subforms and datasources to be expanded.
        const forms = info.source.fields.reduce((obj, field, i) => {
            if (field.subform && field.subform !== '') {
                if (field.subform in obj.forms) {
                    obj.forms[field.subform].push(i);
                } else {
                    obj.forms[field.subform] = [i];
                }
            } else if (field.datasource != null && field.datasource.name != null
                    && field.datasource.name !== '') {
                const name = field.datasource.name;
                const label = field.datasource.label;
                const value = field.datasource.value;
                if (name in obj.datasources) {
                    obj.datasources[name].indices.push(i);
                    obj.datasources[name].projection.add(label);
                    obj.datasources[name].projection.add(value);
                } else {
                    obj.datasources[name] = { indices: [i], projection: new Set([label, value]) };
                }
            }
            return obj;
        }, { forms: {}, datasources: {} });

        // Search them in DB
        const body = {
            where: {
                name: Object.keys(forms.forms),
            },
        };

        const results = await EntitiesUtils.search('form', body);
        if ('hits' in results.result) {
            results.result.hits.forEach((h) => {
                const indices = forms.forms[h.db.source.name];
                indices.forEach((i) => {
                    this._db.source.fields[i].subform_content = h.db.source;
                });
            });
        }

        const all_datasources = await Promise.all(Object.keys(forms.datasources).map(ds => EntitiesUtils.search(ds, {
            projection: forms.datasources[ds].projection,
            size: 500,
        })));

        all_datasources.forEach((datasource) => {
            if ('hits' in datasource.result) {
                const indices = forms.datasources[datasource.entity].indices;
                indices.forEach((i) => {
                    this._db.source.fields[i].datasource.content =
                        datasource.result.hits.map(h => h.db.source);
                });
            }
        });
    }
}

module.exports = Form;
