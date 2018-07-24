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
const CSLJSONPipeline = require('../pipeline/csl_pipeline');
const Transformer = require('../../../pipeline/transformer/transformer');
const CSVStringify = require('csv-stringify');
const LangUtils = require('../../../utils/lang');
const BibTeXUtils = require('../../../utils/bibtex');
const HtmlDocx = require('html-docx-js');
const Cite = require('citation-js');
const Errors = require('../../../exceptions/errors');
const CSLUtils = require('../../../utils/csl');
const Cache = require('../../../utils/cache');
const Logger = require('../../../../logger');
const URLUtils = require('../../../utils/url');
const Json2Xml = require('json2xml');

const bibtexCache = new Cache(10000);

ExtraCSLStyles.add_styles(Cite, ExtraCSLStyles.styles);

async function transform_to_bibtex_type(publication: Object, extra: Object,
    fields: Array<string> = [], type: string = 'other', memoizer: Object): Promise<Object> {
    const grab_abstract = async (pub) => {
        const ab = pub.abstracts.filter(a => a.lang === pub.lang);
        if (ab.length > 0) {
            return `"{${BibTeXUtils.escape_to_bibtex(ab[0].content)}}"`;
        }
        return null;
    };

    const grab_date = async (pub, t) => {
        const months_mapping = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const dpublication = pub.dates.publication;
        if (t === 'year') {
            return `"${moment(dpublication).format('YYYY')}"`;
        } else if (t === 'month') {
            return `"${months_mapping[moment(dpublication).format('M') - 1]}"`;
        }
        return null;
    };

    const grab_address = async (pub) => {
        const country = Utils.find_value_with_path(pub, 'denormalization.localisation.country'.split('.'));
        let tcountry = null;
        if (country) {
            const key = `${country}__${extra.lang}`;
            if (key in memoizer.lang) {
                tcountry = memoizer.lang[key];
            } else {
                tcountry = await LangUtils.get_language_values_from_langs(country,
                    [{ value: extra.lang }]);
                if (tcountry.length > 0) {
                    tcountry = tcountry[0].value;
                } else {
                    tcountry = null;
                }
                memoizer.lang[key] = tcountry;
            }
        }
        const city = Utils.find_value_with_path(pub, 'localisation.city'.split('.'));
        if (city && tcountry) {
            return `"${BibTeXUtils.escape_to_bibtex(`${city} (${tcountry})`)}"`;
        } else if (city) {
            return `"${BibTeXUtils.escape_to_bibtex(city)}"`;
        } else if (tcountry) {
            return `"${BibTeXUtils.escape_to_bibtex(tcountry)}"`;
        }
        return null;
    };

    const grab_author = async (pub) => {
        const authors_et_al = pub.contributors.filter(c => c.role !== 'editor');

        if (authors_et_al.length === 0) {
            return null;
        }

        let roles = [];

        if ('roles' in memoizer.contributor_role) {
            roles = memoizer.contributor_role.roles;
        } else {
            roles = await EntitiesUtils.search_and_get_sources('contributor_role', {
                size: 50,
                where: {},
                population: ['abbreviation'],
            });
            memoizer.contributor_role.roles = roles;
        }

        const authors = (await Promise.all(authors_et_al.map(async (a) => {
            if (a.label in memoizer.author) {
                return memoizer.author[a.label];
            }
            const author = await EntitiesUtils.retrieve_and_get_source('author', a.label);
            memoizer.author[a.label] = author;
            return author;
        }))).filter(a => a != null);

        const authors_roles = authors_et_al.map(a => roles.find(r => r.value === a.role));

        const names = authors.map((a, i) => {
            const role = authors_roles[i];
            if (role.value !== 'author') {
                let abbreviation = '?';
                if ('abbreviation' in role) {
                    abbreviation = role.abbreviation
                        .filter(ab => ab.lang === extra.lang)[0].values
                        .filter(v => (v.quantity === 'n/a' || v.quantity === '1'))[0].value;
                }
                return `${BibTeXUtils.escape_to_bibtex(a.lastname)}, ${BibTeXUtils.escape_to_bibtex(a.firstname)} (${BibTeXUtils.escape_to_bibtex(abbreviation.toLowerCase())})`;
            }
            return `${BibTeXUtils.escape_to_bibtex(a.lastname)}, ${BibTeXUtils.escape_to_bibtex(a.firstname)}`;
        });

        if (names.length === 0) {
            return null;
        }
        return `"${names.join(' and ')}"`;
    };

    const grab_editor = async (pub) => {
        const editors_only = pub.contributors.filter(c => c.role === 'editor');
        if (editors_only.length === 0) {
            return null;
        }

        const editors = (await Promise.all(editors_only.map((a) => {
            if (a.label in memoizer.author) {
                return memoizer.author[a.label];
            }
            const author = EntitiesUtils.retrieve_and_get_source('author', a.label);
            memoizer.author[a.label] = author;
            return author;
        }))).filter(a => a != null);
        const names = editors.map(a => `${BibTeXUtils.escape_to_bibtex(a.lastname)}, ${BibTeXUtils.escape_to_bibtex(a.firstname)}`);
        return `"${names.join(' and ')}"`;
    };

    const grab_and_escape = async (pub, path, bracketing = true) => {
        const r = Utils.find_value_with_path(pub, path.split('.'));
        if (r) {
            if (bracketing) {
                return `{${BibTeXUtils.escape_to_bibtex(r)}}`;
            }
            return `${BibTeXUtils.escape_to_bibtex(r)}`;
        }
        return null;
    };

    const grab_id = async (pub, path, t) => {
        const ids = Utils.find_value_with_path(pub, path.split('.'));
        if (!ids) {
            return null;
        }

        const matched_ids = ids.filter(id => id.type === t);
        if (matched_ids.length > 0) {
            return `"${matched_ids[0]._id}"`;
        }
        return null;
    };

    const mapper = {
        title: () => grab_and_escape(publication, 'title.content'),
        volume: () => grab_and_escape(publication, 'volume'),
        number: () => grab_and_escape(publication, 'number'),
        pages: () => grab_and_escape(publication, 'pagination', false),
        note: () => grab_and_escape(publication, 'description'),
        language: () => grab_and_escape(publication, 'lang'),
        abstract: () => grab_abstract(publication),
        author: () => grab_author(publication),
        isbn: () => grab_id(publication, 'ids', 'isbn'),
        doi: () => grab_id(publication, 'ids', 'doi'),
        publisher: () => grab_and_escape(publication, 'denormalization.editor'),
        editor: () => grab_editor(publication),
        journal: () => grab_and_escape(publication, 'denormalization.journal'),
        year: () => grab_date(publication, 'year'),
        month: () => grab_date(publication, 'month'),
        booktitle: () => grab_and_escape(publication, 'denormalization.conference'),
        url: () => grab_and_escape(publication, 'url', false),
        institution: () => grab_and_escape(publication, 'denormalization.delivery_institution'),
        address: () => grab_address(publication),
        location: () => grab_address(publication),
    };

    const obj = {};
    for (const i in fields) {
        const field = fields[i];
        if (field in mapper) {
            const r = await mapper[field]();
            if (r && r.trim() !== '') {
                obj[field] = r;
            }
        }
    }
    return obj;
}

async function transform_to_bibtex(publications: Array<Object>, extra: Object, memoizer: Object): Promise<string> {
    if (!memoizer) {
        memoizer = {
            typology: {}, contributor_role: {}, author: {}, lang: {},
        };
    }

    const results = [];
    const typology_mapping = {
        journal: 'article',
        book: 'book',
        conference: 'conference',
        'book-chapter': 'inbook',
        'book-proceedings': 'inproceedings',
        other: 'misc',
        report: 'techreport',
        'working-paper': 'unpublished',
        thesis: 'phdthesis',
    };

    const fields_mapping = {
        journal: ['author', 'title', 'journal', 'year', 'volume', 'number', 'pages', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url'],
        book: ['author', 'publisher', 'title', 'year', 'volume', 'address', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url', 'location'],
        conference: ['author', 'booktitle', 'title', 'year', 'editor', 'pages', 'publisher', 'address', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url', 'location'],
        'book-chapter': ['author', 'booktitle', 'title', 'year', 'editor', 'pages', 'publisher', 'address', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url', 'lcation'],
        'book-proceedings': ['author', 'booktitle', 'title', 'year', 'publisher', 'publisher', 'address', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url', 'location'],
        other: ['author', 'title', 'month', 'year', 'abstract', 'language', 'note', 'isbn', 'doi', 'url'],
        report: ['author', 'title', 'institution', 'year', 'number', 'address', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url'],
        'working-paper': ['author', 'title', 'note', 'month', 'year', 'abstract', 'language', 'isbn', 'url', 'doi'],
        thesis: ['author', 'title', 'shool', 'year', 'month', 'address', 'note', 'abstract', 'language', 'isbn', 'url', 'doi'],
    };

    for (const i in publications) {
        const publication = publications[i].source;
        let lines = [];
        let type = 'other';

        const cached = bibtexCache.get(publication._id);
        if (cached) {
            results.push(cached);
            continue;
        }

        if (publication.subtype && publication.subtype in typology_mapping) {
            type = publication.subtype;
            lines.push(`@${typology_mapping[type]}{${publication._id.replace('@', '__')}`);
        } else {
            let typology = null;

            if (publication.type in memoizer.typology) {
                typology = memoizer.typology[publication.type];
            } else {
                const typologys = await EntitiesUtils.search_and_get_sources('typology', {
                    size: 1,
                    where: {
                        _id: [publication.type],
                    },
                });
                typology = typologys[0];
                memoizer.typology[publication.type] = typology;
            }

            const name = typology.name;
            if (name in typology_mapping) {
                type = name;
                lines.push(`@${typology_mapping[type]}{${publication._id}`);
            } else {
                lines.push(`@misc{${publication._id}`);
            }
        }

        const obj = await transform_to_bibtex_type(publication, extra, fields_mapping[type], type, memoizer);
        lines = lines.concat(_.reduce(obj, (arr, val, key) => {
            arr.push(`${key} = ${val}`);
            return arr;
        }, []));

        let str_obj = lines.join(',\n');
        str_obj += '\n}';
        results.push(str_obj);
        bibtexCache.add(publication._id, str_obj);
    }
    return results.join('\n\n');
}

async function transform_to_ris(publications: Array<Object>, extra: Object): Promise<string> {
    const results = [];
    for (const i in publications) {
        const publication = publications[i].source;
        let lines = [];
        let ris_type = null;
        if (publication.subtype && publication.subtype in RISPipeline.types) {
            ris_type = RISPipeline.types[publication.subtype];
            lines.push(`TY  - ${ris_type}`);
        } else {
            const typologys = await EntitiesUtils.search_and_get_sources('typology', {
                size: 1,
                where: {
                    _id: [publication.type],
                },
            });
            const typology = typologys[0];
            const name = typology.name;
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
            const typologys = await EntitiesUtils.search_and_get_sources('typology', {
                size: 1,
                where: {
                    _id: [publication.type],
                },
            });
            const typology = typologys[0];
            const name = typology.name;
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
    const keys = Object.keys(CSVPipeline.labels);
    let headers = Object.values(CSVPipeline.labels);

    headers = headers.sort((a, b) => (a.order - b.order)).map(lab => `#POS#LANG${lab.label}`).join('|');
    headers = (await LangUtils.strings_to_translation(headers, extra.lang)).split('|');

    let typology = await EntitiesUtils.search_and_get_sources('typology', {
        size: 100,
    });
    typology = typology.reduce((obj, typo) => {
        obj[typo._id] = typo.name;
        return obj;
    }, {});

    results.push(headers);

    for (const i in publications) {
        const publication = publications[i].source;
        const pos_type = typology[publication.type];
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
            ext = '.csv';
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


        const s = new Readable();
        s.push(results);
        s.push(null);

        ctx.set('Content-disposition', `attachment; filename=pos_exports${ext}`);
        ctx.statusCode = 200;
        ctx.body = s;
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
    size = [Math.max(1000, parseInt(size[0]), 10)];

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
