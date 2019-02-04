// @flow
const moment = require('moment');
const _ = require('lodash');
const CSVStringify = require('csv-stringify');
const Readable = require('stream').Readable;
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');
const MASASPipeline = require('../pipeline/masas_pipeline');
const LangUtils = require('../../../utils/lang');
const Logger = require('../../../../logger');
const Errors = require('../../../exceptions/errors');
const XLSXParser = require('node-xlsx');
const fs = require('fs');

async function transform_to_masas(publications: Array<Object>, filetype: string, extra: Object): Promise<string> {
    let results = [];
    let keys = _.map(MASASPipeline.labels, (value, key) => [key, value]);
    keys.sort((a, b) => (a[1].order - b[1].order));
    keys = keys.map(info => info[0]);

    let headers = Object.values(MASASPipeline.labels);
    headers = headers.sort((a, b) => (a.order - b.order)).map(lab => `#POS#LANG${lab.label}`);

    let typology = await EntitiesUtils.search_and_get_sources('typology', {
        size: 100,
    });
    typology = typology.reduce((obj, typo) => {
        obj[typo._id] = typo.name;
        return obj;
    }, {});

    const memoizer = {};
    let max_authors = 0;
    for (const i in publications) {
        const publication = publications[i];
        const pos_type = typology[publication.type];
        let obj = {};
        for (const key in MASASPipeline.mapping) {
            const pub_info = Utils.find_value_with_path(publication, key.split('.'));
            if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
                continue;
            }
            const info = MASASPipeline.mapping[key];
            let mapper = null;
            if (pos_type in info) {
                mapper = info[pos_type];
            } else if ('__default' in info) {
                mapper = info.__default;
            }

            if (!mapper) {
                continue;
            }

            let subobj = await mapper.picker(pub_info, publication, extra.lang, key, memoizer);
            if (mapper.transformers.length > 0) {
                subobj = await mapper.transformers.reduce((o, tr) => {
                    o = tr(o);
                    return o;
                }, subobj);
            }
            obj = _.mergeWith(obj, subobj, (objValue, srcValue) => {
                if (_.isArray(objValue)) {
                    return objValue.concat(srcValue);
                }
            });
        }

        max_authors = Math.max((obj['denormalization.contributors'] || []).length, max_authors);
        results.push(obj);
    }

    results = results.map((obj) => {
        let row = keys.map((k) => {
            if (k === 'denormalization.contributors') {
                const subarray = _.fill(Array(max_authors * 3), '');
                obj[k].forEach((au, idx) => {
                    subarray[idx] = au.fullname;
                    subarray[idx + max_authors] = au.status;
                    subarray[idx + (max_authors * 2)] = au.aff;
                });
                return subarray;
            }
            if (k in obj) {
                return obj[k];
            }
            return '';
        });
        row = _.flatten(row);
        return row;
    });

    const contrib_order = MASASPipeline.labels['denormalization.contributors'].order;
    headers[contrib_order] = _.fill(Array(max_authors * 3), '').map((r, idx) => {
        if (idx >= 0 && idx < max_authors) {
            return `#POS#LANGl_author ${idx + 1}`;
        } else if (max_authors <= idx && idx < max_authors * 2) {
            return `#POS#LANGl_ined_status ${idx - max_authors + 1}`;
        } else if (max_authors * 2 <= idx && idx < max_authors * 3) {
            return `#POS#LANGl_affiliation ${idx - (max_authors * 2) + 1}`;
        }
        return '';
    });

    headers = _.flatten(headers);
    headers = (await LangUtils.strings_to_translation(headers.join('|'), extra.lang)).split('|');
    results = [headers].concat(results);

    if (filetype === 'xlsx') {
        return XLSXParser.build([{ name: 'POS', data: results }]);
    }
    const csv_string = await new Promise((resolve, reject) => {
        CSVStringify(results, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });
    return csv_string;
}

async function export_masas(ctx: Object): Promise<any> {
    const query = ctx.query;

    const types = query.typology || [];
    const subtypes = query.subtypology || [];
    const projects = query.project || [];
    const authors = query.author || [];
    const labs = query.laboratory || [];
    const statuses = query.ined_status || [];
    let statuses_id = [];
    const sort = query.sort || [];
    const start_year = query.start_year || [];
    const end_year = query.end_year || [];
    const export_types = query.export_type || ['csv'];

    /* if (projects.length === 0 && authors.length === 0
            && labs.length === 0 && statuses.length === 0) {
        const e = Errors.InvalidEntity;
        e.message = 'l_err_no_project_author_lab_status_bexport';
        throw e;
    }*/

    if (types.length === 0 && subtypes.length === 0) {
        const e = Errors.InvalidEntity;
        e.message = 'l_err_no_typology_bexport';
        throw e;
    }

    if (sort.length === 0) {
        const e = Errors.InvalidEntity;
        e.message = 'l_err_no_sort_bexport';
        throw e;
    }

    const where = { $and: [] };

    if (statuses.length > 0) {
        statuses_id = (await EntitiesUtils.search_and_get_sources('author', {
            size: 10000,
            where: {
                'affiliations.ined_status': statuses,
            },
            projection: [],
        })).map(i => i._id);
    }

    if (authors.length > 0) {
        where.$and.push({ 'contributors.label': authors });
    }

    if (statuses_id.length > 0) {
        where.$and.push({ 'contributors.label': statuses_id });
    }

    if (projects.length > 0) {
        where.$and.push({ 'diffusion.projects._id': projects });
    }

    if (labs.length > 0) {
        where.$and.push({ 'diffusion.research_teams._id': labs });
    }

    if (types.length > 0) {
        where.$and.push({ type: types });
    }

    if (subtypes.length > 0) {
        where.$and.push({ subtype: subtypes });
    }

    if (start_year.length > 0) {
        const range = { '>=': parseInt(start_year[0], 10) };
        if (end_year.length > 0) {
            // get the end of the year
            range['<='] = moment(parseInt(end_year[0], 10)).add(1, 'year').valueOf() - 1;
        }
        where.$and.push({ 'dates.publication': range });
    }

    const pub_results = await EntitiesUtils.search_and_get_sources('publication', {
        where,
        size: 1000, // size[0],
        sort,
    });

    const results = await transform_to_masas(pub_results, export_types[0], { lang: 'FR' });

    if (export_types[0] === 'xlsx') {
        ctx.set('Content-disposition', `attachment; filename=pos_exports.${export_types[0]}`);
        ctx.statusCode = 200;
        ctx.body = results;
        fs.writeFile('/tmp/test.xlsx', results, (err) => {
            if (err) {
                Logger.error('error : ', err);
            }
        });
    } else {
        const s = new Readable();
        s.push(results);
        s.push(null);
        ctx.set('Content-disposition', `attachment; filename=pos_exports.${export_types[0]}`);
        ctx.statusCode = 200;
        ctx.body = results;
    }
}

module.exports = {
    transform_to_masas,
    export_masas,
};
