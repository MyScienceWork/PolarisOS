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

async function process_aggregations(aggs: Object, lang: string): Promise<Array> {
    const root_key = Object.keys(aggs).length > 0 ? Object.keys(aggs)[0] : null;

    if (!root_key) {
        return [];
    }

    const buckets = aggs[root_key].buckets || [];

    if (buckets.length === 0) {
        return [];
    }

    let typology_children = [];
    if (root_key.indexOf('subtype') === -1) {
        const publications = buckets.map((bucket) => {
            const key = bucket.key_as_string || bucket.key;
            const pubs = Utils.find_value_with_path(bucket, 'publications.hits.hits'.split('.')) || [];
            return { key,
                publications: pubs.map((p) => {
                    p._source._id = p._id;
                    return { source: p._source };
                }) };
        });
        return publications;
    }

    const typologies = await EntitiesUtils.search_and_get_sources('typology', {
        size: 100,
        where: {},
    });
    const children = _.flatten(typologies.map(type => type.children));
    children.sort((a, b) => a.order_view.localeCompare(b.order_view));
    const children_lang_keys = children.map(child => child.label);
    const lang_items = await LangUtils.get_language_values_from_langs_and_keys(children_lang_keys, [lang]);

    typology_children = children.reduce((obj, child) => {
        const it = lang_items[lang][child.label] || child.label;
        child.label = it;
        obj[child.name] = child;
        return obj;
    }, {});


    let publications = [];
    if (root_key.indexOf('subtype') !== -1 && root_key.indexOf('year') !== -1) {
        publications = buckets.map((bucket) => {
            const key = bucket.key_as_string || bucket.key;
            const infos = bucket.subtype.buckets.map((subbucket) => {
                const subkey = subbucket.key_as_string || subbucket.key;
                const pubs = Utils.find_value_with_path(subbucket, 'publications.hits.hits'.split('.')) || [];
                return {
                    key: typology_children[subkey] ? typology_children[subkey].label : key,
                    order_view: typology_children[subkey] ? typology_children[subkey].order_view : '0',
                    publications: pubs.map((p) => {
                        p._source._id = p._id;
                        return { source: p._source };
                    }) };
            });
            infos.sort((a, b) => a.order_view.localeCompare(b.order_view));

            if (infos.length === 0) {
                return null;
            }
            return { key, information: infos };
        }).filter(i => i != null);
    } else {
        publications = buckets.map((bucket) => {
            const key = bucket.key_as_string || bucket.key;
            const pubs = Utils.find_value_with_path(bucket, 'publications.hits.hits'.split('.')) || [];
            return {
                key: typology_children[key] ? typology_children[key].label : key,
                order_view: typology_children[key] ? typology_children[key].order_view : '0',
                publications: pubs.map((p) => {
                    p._source._id = p._id;
                    return { source: p._source };
                }) };
        });

        publications.sort((a, b) => a.order_view.localeCompare(b.order_view));
    }
    return publications;
}

async function format_bibliography_results(publications: Array<Object>,
        lang: string,
        csl: string,
        info: Object, memoizer: Object): Promise<string> {
    const csl_json_output = await transform_to_csl_json(publications, info);
    console.log(JSON.stringify(csl_json_output));
    const data = new Cite(csl_json_output);
    let results = data.get({
        nosort: true,
        format: 'string',
        type: 'html',
        style: `citation-${csl}`,
        lang: CSLUtils.langs_mapping[lang] || 'en-US',
    });
    results = URLUtils.transform_static_links_to_clickable_links_with_offset(results);
    return results;
}

async function export_bibliography(ctx: Object): Promise<any> {
    const query = ctx.query;

    const types = query.typology || [];
    const subtypes = query.subtypology || [];
    const projects = query.project || [];
    const authors = query.author || [];
    const labs = query.laboratory || [];
    const collections = query.internal_collection || [];
    const sort = query.sort || [];
    const group = query.group || [];
    const export_type = query.export_type || ['.html'];
    const csl = query.csl || [];
    const lang = query.language || [];
    const start_year = query.start_year || [];
    const end_year = query.end_year || [];
    let size = query.size || [1000];
    size = [Math.max(1000, parseInt(size[0], 10))];

    if (lang.length === 0) {
        const e = Errors.InvalidEntity;
        e.message = 'l_err_no_language_bexport';
        throw e;
    }

    if (projects.length === 0 && authors.length === 0 && labs.length === 0) {
        const e = Errors.InvalidEntity;
        e.message = 'l_err_no_project_author_lab_bexport';
        throw e;
    }

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

    /* if (group.length === 0) {
        const e = Errors.InvalidEntity;
        e.message = 'l_err_no_group_bexport';
        throw e;
        }*/

    if (csl.length === 0) {
        const e = Errors.InvalidEntity;
        e.message = 'l_err_no_style_bexport';
        throw e;
    }

    const where = { $and: [] };

    if (authors.length > 0) {
        where.$and.push({ 'contributors.label': authors });
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

    if (collections.length > 0) {
        where.$and.push({ 'diffusion.internal_collection': collections });
    }

    if (start_year.length > 0) {
        const range = { '>=': parseInt(start_year[0], 10) };

        if (end_year.length > 0) {
            range['<='] = parseInt(end_year[0], 10);
        }
        where.$and.push({ 'dates.publication': range });
    }

    const source_includes = ['title.content', 'lang',
        'journal', 'contributors.*', 'ids.*', 'volume', 'pagination', 'abstract',
        'denormalization.*', 'url', 'dates.*', 'description',
        'localisation.*', 'authors.*', 'number', 'editor'];

        // ['title.content'];
    let aggregations = {};
    if (group[0] === 'dates.publication') {
        aggregations = {
            [group[0]]: {
                $name: group[0],
                $type: 'date_histogram',
                interval: 'year',
                format: 'YYYY',
                keyed: true,
                min_doc_count: 1,
                order: { _time: 'desc' }, // Deprecated in ES 6.x TODO
                $aggregations: {
                    dummy_field: {
                        $name: 'publications',
                        $type: 'top_hits',
                        size: Math.round(size[0] / 10), // Estimate no more than 10y
                        /* _source: {
                            includes: source_includes,
                            },*/
                        sort,
                    },
                },
            },
        };
    } else if (group[0] === 'subtype') {
        aggregations = {
            [group[0]]: {
                $name: group[0],
                $type: 'terms',
                keyed: true,
                min_doc_count: 1,
                // order: { _term: 'asc' },
                $aggregations: {
                    dummy_field: {
                        $name: 'publications',
                        $type: 'top_hits',
                        size: Math.round(size[0]),
                        sort,
                        /* _source: {
                            includes: source_includes,
                            },*/
                    },
                },
            },
        };
    } else if (group[0] === 'dates.publication+subtype') {
        aggregations = {
            'dates.publication': {
                $name: 'year_subtype',
                $type: 'date_histogram',
                interval: 'year',
                format: 'YYYY',
                keyed: true,
                min_doc_count: 1,
                order: { _time: 'desc' },
                $aggregations: {
                    subtype: {
                        $name: 'subtype',
                        $type: 'terms',
                        keyed: true,
                        min_doc_count: 1,
                        order: { _term: 'asc' },
                        $aggregations: {
                            dummy_field: {
                                $name: 'publications',
                                $type: 'top_hits',
                                size: Math.round(size[0]),
                                sort,
                                /* _source: {
                                    includes: source_includes,
                                    },*/
                            },
                        },
                    },
                },
            },
        };
    }

    const pub_results = await EntitiesUtils.search('publication', {
        where,
        size: 0,
        aggregations,
    });

    const aggs = EntitiesUtils.get_aggs(pub_results);

    const list_of_publications = await process_aggregations(aggs, lang[0]);

    ctx.__md.lang = lang[0];

    const memoizer = {
        typology: {}, contributor_role: {}, author: {}, lang: {},
    };


    let final_results = '';

    if (group[0] === 'dates.publication+subtype') {
        for (const infos of list_of_publications) {
            final_results += `<h2>${infos.key}</h2>`;
            for (const publications of infos.information) {
                const results = await format_bibliography_results(publications.publications,
                    lang[0], csl[0], ctx.__md, memoizer);
                final_results += `<h3>${publications.key}</h3>`;
                final_results += results;
            }
        }
    } else {
        for (const publications of list_of_publications) {
            const results = await format_bibliography_results(publications.publications,
                lang[0], csl[0], ctx.__md, memoizer);
            final_results += `<h2>${publications.key}</h2>`;
            final_results += results;
        }
    }


    if (export_type[0] === '.docx') {
        let results = `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head><body>${final_results}</body></html>`;
        results = HtmlDocx.asBlob(results);

        const s = new Readable();
        s.push(results);
        s.push(null);

        ctx.set('Content-disposition', `attachment; filename=pos_exports${export_type[0]}`);
        ctx.statusCode = 200;
        ctx.body = s;
        return;
    }

    ctx.type = 'text/html';
    const results = `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head><body>${final_results}</body></html>`;
    ctx.body = results;
}

module.exports = {
    export_information,
    export_bibliography,
};
