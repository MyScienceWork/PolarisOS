// @flow
const Readable = require('stream').Readable;
const ExtraCSLStyles = require('../../../../csl_styles/register');
const moment = require('moment');
const _ = require('lodash');
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');
const CSVPipeline = require('../pipeline/csv_pipeline');
const RISPipeline = require('../pipeline/ris_pipeline');
const EndNotePipeline = require('../pipeline/endnote_pipeline');
const BibTeXPipeline = require('../pipeline/bibtex_pipeline');
const CSLJSONPipeline = require('../pipeline/csl_pipeline');
const Transformer = require('../../../pipeline/transformer/transformer');
const CSVStringify = require('csv-stringify');
const LangUtils = require('../../../utils/lang');
const BibTeXUtils = require('../../../utils/bibtex');
const HtmlDocx = require('html-docx-js');
const Cite = require('citation-js');
const Errors = require('../../../exceptions/errors');
const CSLUtils = require('../../../utils/csl');
const Logger = require('../../../../logger');
const URLUtils = require('../../../utils/url');
const Json2Xml = require('json2xml');
const XLSXParser = require('node-xlsx');
const BibliographicExporter = require('../bibliographic_exporter');

ExtraCSLStyles.add_styles(Cite, ExtraCSLStyles.styles);

async function transform_to_bibtex(publications: Array<Object>, extra: Object): Promise<string> {
    const results = [];
    let typology = await EntitiesUtils.search_and_get_sources('typology', {
        size: 100,
    });
    typology = typology.reduce((obj, typo) => {
        obj[typo._id] = typo;
        return obj;
    }, {});

    for (const i in publications) {
        const publication = publications[i].source;
        let bibtex_type = null;
        let pos_type = null;
        let obj = { };
        if (publication.subtype && publication.subtype in BibTeXPipeline.types) {
            bibtex_type = BibTeXPipeline.types[publication.subtype];
            pos_type = publication.subtype;
            obj.type = bibtex_type;
        } else {
            const name = typology[publication.type].name;
            if (name in BibTeXPipeline.types) {
                bibtex_type = BibTeXPipeline.types[name];
                pos_type = name;
            } else {
                bibtex_type = BibTeXPipeline.types.other;
                pos_type = 'other';
            }
            obj.type = bibtex_type;
        }

        for (const key in BibTeXPipeline.mapping) {
            const pub_info = Utils.find_value_with_path(publication, key.split('.'));
            if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
                continue;
            }

            const info = BibTeXPipeline.mapping[key];
            let mapper = null;
            if (pos_type in info) {
                mapper = info[pos_type];
            } else if ('__default' in info) {
                mapper = info.__default;
            }

            if (!mapper) {
                continue;
            }

            let subobj = await mapper.picker(pub_info, publication, extra.lang);
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

        let lines = [`@${obj.type}{${publication._id}`];
        lines = _.reduce(obj, (arr, value, key) => {
            if (key === 'type') {
                return arr;
            }
            if (BibTeXPipeline.case_protected_fields.has(key)) {
                arr.push(`${key} = {${value}}`);
            } else {
                arr.push(`${key} = ${value}`);
            }
            return arr;
        }, lines);
        lines.push('}');
        results.push(lines.join(',\n'));
    }

    return results.join('\n\n');
}

async function transform_to_ris(publications: Array<Object>, extra: Object): Promise<string> {
    const results = [];

    let typology = await EntitiesUtils.search_and_get_sources('typology', {
        size: 100,
    });
    typology = typology.reduce((obj, typo) => {
        obj[typo._id] = typo;
        return obj;
    }, {});

    for (const i in publications) {
        const publication = publications[i].source;
        let lines = [];
        let ris_type = null;
        if (publication.subtype && publication.subtype in RISPipeline.types) {
            ris_type = RISPipeline.types[publication.subtype];
            lines.push(`TY  - ${ris_type}`);
        } else {
            const name = typology[publication.type].name;
            if (name in RISPipeline.types) {
                ris_type = RISPipeline.types[name];
                lines.push(`TY  - ${ris_type}`);
            } else {
                ris_type = 'GEN';
                lines.push('TY  - GEN');
            }
        }

        lines.push(`ID  - ${publication._id}`);

        let obj = {};
        for (const key in RISPipeline.mapping) {
            const pub_info = Utils.find_value_with_path(publication, key.split('.'));
            if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
                continue;
            }

            const info = RISPipeline.mapping[key];
            let mapper = null;
            if (ris_type in info) {
                mapper = info[ris_type];
            } else if ('__default' in info) {
                mapper = info.__default;
            }

            if (!mapper) {
                continue;
            }

            let subobj = await mapper.picker(pub_info, publication, extra.lang);
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
        _.forEach(obj, (val, key) => {
            if (_.isArray(val)) {
                lines = lines.concat(val.map(v => `${key}  - ${v}`));
            } else {
                lines.push(`${key}  - ${val}`);
            }
        });

        lines.push('ER  - ');
        results.push(lines.join('\n'));
    }
    return results.join('\n\n');
}

async function transform_to_endnote(publications: Array<Object>, extra: Object): Promise<string> {
    const results = [];
    let typology = await EntitiesUtils.search_and_get_sources('typology', {
        size: 100,
    });
    typology = typology.reduce((obj, typo) => {
        obj[typo._id] = typo;
        return obj;
    }, {});

    for (const i in publications) {
        const publication = publications[i].source;
        const final_obj = {
            record: [
                    { attrs: { name: 'MyLibrary' }, database: 'MyLibrary' },
                    { attrs: { name: 'PolarisOS' }, 'source-app': 'PolarisOS' },
            ],
        };


        let endnote_type = null;
        let pos_type = null;
        if (publication.subtype && publication.subtype in EndNotePipeline.types) {
            endnote_type = EndNotePipeline.types[publication.subtype];
            pos_type = publication.subtype;
            final_obj.record.push(endnote_type);
        } else {
            const name = typology[publication.type].name;
            if (name in EndNotePipeline.types) {
                endnote_type = EndNotePipeline.types[name];
                pos_type = name;
            } else {
                endnote_type = EndNotePipeline.types.other;
                pos_type = 'other';
            }
            final_obj.record.push(endnote_type);
        }

        let obj = { 'remote-database-provider': 'ArchIned' };
        for (const key in EndNotePipeline.mapping) {
            const pub_info = Utils.find_value_with_path(publication, key.split('.'));
            if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
                continue;
            }

            const info = EndNotePipeline.mapping[key];
            let mapper = null;
            if (pos_type in info) {
                mapper = info[pos_type];
            } else if ('__default' in info) {
                mapper = info.__default;
            }

            if (!mapper) {
                continue;
            }

            let subobj = await mapper.picker(pub_info, publication, extra.lang);
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

        _.forEach(obj, (val, key) => {
            final_obj.record.push({ [key]: val });
        });
        results.push(final_obj);
    }

    return Json2Xml({ xml: { records: results } }, { header: true, attributes_key: 'attrs' });
}

async function transform_to_csv(publications: Array<Object>, extra: Object): Promise<string> {
    const results = [];

    let keys = _.map(CSVPipeline.labels, (value, key) => [key, value]);
    keys.sort((a, b) => (a[1].order - b[1].order));
    keys = keys.map(info => info[0]);

    let headers = Object.values(CSVPipeline.labels);
    headers = headers.sort((a, b) => (a.order - b.order)).map(lab => `#POS#LANG${lab.label}`).join('|');
    headers = (await LangUtils.strings_to_translation(headers, extra.lang)).split('|');

    let typology = await EntitiesUtils.search_and_get_sources('typology', {
        size: 100,
    });
    typology = typology.reduce((obj, typo) => {
        obj[typo._id] = typo;
        return obj;
    }, {});

    results.push(headers);

    for (const i in publications) {
        const publication = publications[i].source;
        const pos_type = typology[publication.type].name;
        let obj = {};
        for (const key in CSVPipeline.mapping) {
            const pub_info = Utils.find_value_with_path(publication, key.split('.'));
            if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
                continue;
            }

            const info = CSVPipeline.mapping[key];
            let mapper = null;
            if (pos_type in info) {
                mapper = info[pos_type];
            } else if ('__default' in info) {
                mapper = info.__default;
            }

            if (!mapper) {
                continue;
            }

            let subobj = await mapper.picker(pub_info, publication, extra.lang, key);
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

        const row = keys.map((k) => {
            if (k in obj) {
                return obj[k];
            }
            return '';
        });
        results.push(row);
    }

    return XLSXParser.build([{ name: 'POS', data: results }]);
    /* const csv_string = await new Promise((resolve, reject) => {
        CSVStringify(results, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });
    return csv_string;*/
}


async function transform_to_json(publications: Array<Object>, ld): Promise<string> {
    if (ld) {
        return publications.map(p => JSON.stringify(p)).join('\n');
    }
    return JSON.stringify(publications, null, 4);
}

async function transform_to_csl_json(publications: Array<Object>,
    extra: Object): Promise<Array<Object>> {
    const results = [];
    const typologies = (await EntitiesUtils.search_and_get_sources('typology', {
        size: 1000,
    })).reduce((obj, t) => {
        obj[t._id] = t;
        return obj;
    }, {});

    for (const i in publications) {
        const publication = publications[i].source;
        let type = null;
        if (publication.subtype && publication.subtype in CSLJSONPipeline.types) {
            type = CSLJSONPipeline.types[publication.subtype];
        } else {
            const typology = typologies[publication.type];
            const name = typology.name;
            if (name in CSLJSONPipeline.types) {
                type = CSLJSONPipeline.types[name];
            } else {
                type = 'article';
            }
        }

        let obj = {};
        for (const key in CSLJSONPipeline.mapping) {
            const pub_info = Utils.find_value_with_path(publication, key.split('.'));
            if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
                continue;
            }

            const info = CSLJSONPipeline.mapping[key];
            let mapper = null;
            if (type in info) {
                mapper = info[type];
            } else if ('__default' in info) {
                mapper = info.__default;
            }

            if (!mapper) {
                continue;
            }

            let subobj = await mapper.picker(pub_info, publication, extra.lang);
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
        obj.type = type;
        obj.id = publication._id;
        results.push(obj);
    }
    return results;
}

function export_information(): Function {
    return async (ctx: Object): Promise<any> => {
        const body = ctx.request.body;

        const type = body.type;
        const subtype = body.subtype;
        const ids = body.ids;

        if (type == null) {
            ctx.body = {};
            return;
        }

        if (type === 'csl' && subtype == null) {
            ctx.body = {};
            return;
        }

        if (ids == null || ids.length === 0) {
            ctx.body = {};
            return;
        }

        const infos = await EntitiesUtils.search('publication', {
            where: {
                _id: ids,
            },
            sort: ['-dates.publication'],
        });

        const publications = EntitiesUtils.get_hits(infos);

        let results = '';
        let ext = '.bib';

        switch (type) {
        default:
        case 'bibtex':
            results = await transform_to_bibtex(publications, ctx.__md);
            ext = '.bib';
            break;
        case 'ris':
            results = await transform_to_ris(publications, ctx.__md);
            ext = '.ris';
            break;
        case 'csv':
            results = await transform_to_csv(publications, ctx.__md);
            ext = '.xlsx';
            break;
        case 'endnote':
            results = await transform_to_endnote(publications, ctx.__md);
            ext = '.xml';
            break;
        case 'jsonld':
            results = await transform_to_json(publications, true);
            ext = '.jsonld';
            break;
        case 'json':
            results = await transform_to_json(publications, false);
            ext = '.json';
            break;
        case 'csl': {
            const csl_json_output = await transform_to_csl_json(publications, ctx.__md);
            const data = new Cite(csl_json_output);
            results = data.get({
                nosort: true,
                format: 'string',
                type: 'html',
                style: `citation-${subtype}`,
                lang: CSLUtils.langs_mapping[ctx.__md.lang] || 'en-US',
            });
            results = JSON.parse(JSON.stringify(results));
            results = URLUtils.transform_static_links_to_clickable_links_with_offset(results);
            results = `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head><body>${results}</body></html>`;
            results = HtmlDocx.asBlob(results);
            ext = '.docx';
            break;
        }
        }


        if (type === 'csv') {
            ctx.set('Content-disposition', `attachment; filename=pos_exports${ext}`);
            ctx.statusCode = 200;
            ctx.body = results;
        } else {
            const s = new Readable();
            s.push(results);
            s.push(null);

            ctx.set('Content-disposition', `attachment; filename=pos_exports${ext}`);
            ctx.statusCode = 200;
            ctx.body = s;
        }
    };
}

async function export_bibliography(ctx: Object): Promise<any> {
    const query = ctx.query;
    const lang = query.language || ['EN'];
    const csl = query.csl || ['ined_apa'];
    const options = {
        types: query.typology,
        subtypes: query.subtypology,
        projects: query.project,
        authors: query.author,
        labs: query.laboratory,
        collections: query.internal_collection,
        sort: query.sort,
        export_type: query.export_type,
        start_year: query.start_year,
        end_year: query.end_year,
        size: query.size,
        group: query.group,
    };

    const be = new BibliographicExporter(csl[0], lang[0], ctx.__md, options);
    const result = await be.run();

    if (be.filetype === '.docx') {
        ctx.set('Content-disposition', `attachment; filename=pos_exports${export_type[0]}`);
        ctx.statusCode = 200;
        ctx.body = result;
    } else {
        ctx.type = 'text/html';
        ctx.body = result;
    }
}

module.exports = {
    export_information,
    export_bibliography,
};
