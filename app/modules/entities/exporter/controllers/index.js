// @flow
const Readable = require('stream').Readable;
const ExtraCSLStyles = require('../../../../csl_styles/register');
const moment = require('moment');
const _ = require('lodash');
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');
const CSVPipeline = require('../pipeline/csv_pipeline');
const EndNotePipeline = require('../pipeline/endnote_pipeline');
const Transformer = require('../../../pipeline/transformer/transformer');
const CSVStringify = require('csv-stringify');
const LangUtils = require('../../../utils/lang');
const BibTeXUtils = require('../../../utils/bibtex');
const HtmlDocx = require('html-docx-js');
const Cite = require('citation-js');
const Errors = require('../../../exceptions/errors');
const CSLUtils = require('../../../utils/csl');

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
            tcountry = await LangUtils.get_language_values_from_langs(country,
                    [{ value: extra.lang }]);
            if (tcountry.length > 0) {
                tcountry = tcountry[0].value;
            } else {
                tcountry = null;
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

        const authors = await Promise.all(authors_et_al.map(async (a) => {
            if (a.label in memoizer.author) {
                return memoizer.author[a.label];
            }
            const author = await EntitiesUtils.retrieve_and_get_source('author', a.label);
            memoizer.author[a.label] = author;
            return author;
        }));

        const authors_roles = authors_et_al.map(a => roles.find(r => r.value === a.role));

        const names = authors.filter(a => a != null).map((a, i) => {
            const role = authors_roles[i];
            if (role.value !== 'author') {
                const abbreviation = role.abbreviation
                    .filter(ab => ab.lang === extra.lang)[0].values
                    .filter(v => (v.quantity === 'n/a' || v.quantity === '1'))[0].value;
                return `${BibTeXUtils.escape_to_bibtex(a.lastname)}, ${BibTeXUtils.escape_to_bibtex(a.firstname)} (${BibTeXUtils.escape_to_bibtex(abbreviation.toLowerCase())})`;
            }
            return `${BibTeXUtils.escape_to_bibtex(a.lastname)}, ${BibTeXUtils.escape_to_bibtex(a.firstname)}`;
        });
        return `"${names.join(' and ')}"`;
    };

    const grab_editor = async (pub) => {
        const editors_only = pub.contributors.filter(c => c.role === 'editor');
        if (editors_only.length === 0) {
            return null;
        }

        const editors = await Promise.all(editors_only.map(a => EntitiesUtils.retrieve_and_get_source('author', a.label)));
        const names = editors.map(a => `${BibTeXUtils.escape_to_bibtex(a.lastname)}, ${BibTeXUtils.escape_to_bibtex(a.firstname)}`);
        return `"${names.join(' and ')}"`;
    };

    const grab_and_escape = async (pub, path, bracketing = true) => {
        const r = Utils.find_value_with_path(pub, path.split('.'));
        if (r) {
            if (bracketing) {
                return `"{${BibTeXUtils.escape_to_bibtex(r)}}"`;
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
            if (r) {
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
    }
    return results.join('\n\n');
}

async function transform_to_endnote(publications: Array<Object>, extra: Object): Promise<string> {
    const results = [];
    const typology_mapping = {
        book: 'BOOK',
        'other-blog': 'BLOG',
        'book-chapter': 'CHAP',
        'other-software': 'COMP',
        'book-proceedings': 'CONF',
        conference: 'CPAPER',
        'book-chapter-dictionary-article': 'DICT',
        'other-figure': 'FIGURE',
        other: 'GEN',
        journal: 'JOUR',
        'other-maps': 'MAP',
        press: 'NEWS',
        report: 'REPORT',
        'other-audio': 'SOUND',
        thesis: 'THES',
        'working-paper': 'UNPB',
        'other-video': 'VIDEO',
    };

    for (const i in publications) {
        const publication = publications[i].source;
        let lines = [];

        if (publication.subtype && publication.subtype in typology_mapping) {
            lines.push(`TY  - ${typology_mapping[publication.subtype]}`);
        } else {
            const typologys = await EntitiesUtils.search_and_get_sources('typology', {
                size: 1,
                where: {
                    _id: [publication.type],
                },
            });
            const typology = typologys[0];
            const name = typology.name;
            if (name in typology_mapping) {
                lines.push(`TY  - ${typology_mapping[name]}`);
            } else {
                lines.push('TY  - GEN');
            }
        }

        lines.push(`ID  - ${publication._id}`);
        if (publication.abstracts.length > 0) {
            const rab = publication.abstracts.filter(a => a.lang === publication.lang);
            if (rab.length === 0) {
                lines.push(`AB  - ${publication.abstracts[0].content}`);
            } else {
                lines.push(`AB  - ${rab[0].content}`);
            }
        }

        const authors = publication.denormalization.authors.map(a => `AU  - ${a._id.fullname}`);
        lines = lines.concat(authors);

        if (publication.localisation && publication.localisation.city) {
            lines.push(`CY  - ${publication.localisation.city}`);
        }

        if (publication.denormalization.editor) {
            lines.push(`ED  - ${publication.denormalization.editor}`);
        }

        if (publication.pagination) {
            lines.push(`EP  - ${publication.pagination}`);
        }

        if (publication.number) {
            lines.push(`IS  - ${publication.number}`);
        }

        if (publication.number) {
            lines.push(`IS  - ${publication.number}`);
        }

        if (publication.denormalization.journal) {
            lines.push(`JO  - ${publication.denormalization.journal}`);
        }

        const keywords = publication.keywords.map(k => `KW  - ${k.value}`);
        lines = lines.concat(keywords);

        if (publication.lang) {
            lines.push(`LA  - ${publication.lang}`);
        }

        if (publication.url) {
            lines.push(`LK  - ${publication.url}`);
        }

        if (publication.description) {
            lines.push(`N1  - ${publication.description}`);
        }

        if (publication.denormalization.localisation && publication.denormalization.localisation.country) {
            const country = publication.denormalization.localisation.country;
            const tcountry = await LangUtils.get_language_values_from_langs(country,
                    [{ value: extra.lang }]);

            if (tcountry.length > 0) {
                lines.push(`PP  - ${tcountry[0].value}`);
            } else {
                lines.push(`PP  - ${country}`);
            }
        }

        if (publication.dates.publication) {
            lines.push(`PY  - ${moment(publication.dates.publication).format('YYYY/MM/DD')}`);
        }

        if (publication.pagination) {
            lines.push(`SP  - ${publication.pagination}`);
        }

        lines.push(`TI  - ${publication.title.content}`);

        if (publication.translated_titles.length > 0) {
            lines.push(`TT  - ${publication.translated_titles[0].content}`);
        }

        if (publication.volume) {
            lines.push(`VL  - ${publication.volume}`);
        }

        if (publication.ids.length > 0) {
            const DOI = publication.ids.filter(id => id.type === 'doi');
            const ISBN = publication.ids.filter(id => id.type === 'isbn');

            if (DOI.length > 0) {
                lines.push(`DO  - ${DOI[0]._id}`);
            }

            if (ISBN.length > 0) {
                lines.push(`SN  - ${ISBN[0]._id}`);
            }
        }

        lines.push('ER  - ');
        results.push(lines.join('\n'));
    }
    return results.join('\n\n');
}

async function transform_to_csv(publications: Array<Object>): Promise<string> {
    const results = [];
    for (const i in publications) {
        const publication = publications[i];
        const result = await Transformer(publication.source, CSVPipeline.transformers);
        const keys = Object.keys(result);
        keys.sort((a, b) => a.localeCompare(b));

        if (parseInt(i, 10) === 0) {
            results.push(keys);
        }

        const row = keys.reduce((arr, k) => {
            arr.push(result[k]);
            return arr;
        }, []);
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
            results = await transform_to_endnote(publications, ctx.__md);
            ext = '.ris';
            break;
        case 'csv':
            results = await transform_to_csv(publications);
            ext = '.csv';
            break;
        case 'endnote':
            results = await transform_to_endnote(publications, ctx.__md);
            ext = '.ris';
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
            const bibtex_output = await transform_to_bibtex(publications, ctx.__md);
            const data = new Cite(bibtex_output);
            results = data.get({
                nosort: true,
                format: 'string',
                type: 'html',
                style: `citation-${subtype}`,
                lang: CSLUtils.langs_mapping[ctx.__md.lang] || 'en-US',
            });
            results = JSON.parse(JSON.stringify(results));
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

    const publications = buckets.map((bucket) => {
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
    return publications;
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
                        size: size[0],
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
                        size: size[0],
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
                $name: 'year',
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
                                size: size[0],
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
    let final_results = '';

    const memoizer = {
        typology: {}, contributor_role: {}, author: {}, lang: {},
    };
    for (const publications of list_of_publications) {
        const bibtex_output = await transform_to_bibtex(publications.publications, ctx.__md, memoizer);
        const data = new Cite(bibtex_output);
        const results = data.get({
            nosort: true,
            format: 'string',
            type: 'html',
            style: `citation-${csl[0]}`,
            lang: CSLUtils.langs_mapping[lang[0]] || 'en-US',
        });
        final_results += `<h2>${publications.key}</h2>`;
        final_results += results;
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
