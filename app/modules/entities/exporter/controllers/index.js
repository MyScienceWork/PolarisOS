// @flow
const Readable = require('stream').Readable;
const Cite = require('citation-js');
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

async function transform_to_bibtex_type(publication: Object, extra: Object,
    fields: Array<string> = [], type: string = 'other'): Promise<Object> {
    const grab_abstract = async (pub) => {
        const ab = pub.abstracts.filter(a => a.lang === pub.lang);
        if (ab.length > 0) {
            return BibTeXUtils.escape_to_bibtex(ab[0].content);
        }
        return null;
    };

    const grab_date = async (pub, t) => {
        const dpublication = pub.dates.publication;
        if (t === 'year') {
            return `"${moment(dpublication).format('YYYY')}"`;
        } else if (t === 'month') {
            return `"${moment(dpublication).format('M')}"`;
        }
        return null;
    };

    const grab_address = async (pub) => {
        const country = Utils.find_value_with_path(pub, 'denormalization.localisation.country'.split('.'));
        let tcountry = null;
        if (country) {
            tcountry = await LangUtils.get_language_values_from_langs(country,
                [{ value: extra.lang }]);
        }

        const city = Utils.find_value_with_path(pub, 'localisation.city'.split('.'));
        if (city && tcountry) {
            return BibTeXUtils.escape_to_bibtex(`${city} (${tcountry})`);
        } else if (city) {
            return BibTeXUtils.escape_to_bibtex(city);
        } else if (tcountry) {
            return BibTeXUtils.escape_to_bibtex(tcountry);
        }
        return null;
    };

    const grab_author = async (pub) => {
        const authors = await Promise.all(pub.authors.map(a => EntitiesUtils.retrieve_and_get_source('author', a._id)));
        const names = authors.map(a => `${BibTeXUtils.escape_to_bibtex(a.lastname)}, ${BibTeXUtils.escape_to_bibtex(a.firstname)}`);
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
        editor: () => grab_and_escape(publication, 'denormalization.editor'),
        journal: () => grab_and_escape(publication, 'denormalization.journal'),
        year: () => grab_date(publication, 'year'),
        month: () => grab_date(publication, 'month'),
        booktitle: () => grab_and_escape(publication, 'denormalization.conference'),
        url: () => grab_and_escape(publication, 'url', false),
        institution: () => grab_and_escape(publication, 'denormalization.delivery_institution'),
        address: () => grab_address(publication),
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

async function transform_to_bibtex(publications: Array<Object>, extra: Object): Promise<string> {
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
        book: ['author', 'publisher', 'title', 'year', 'volume', 'address', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url'],
        conference: ['author', 'booktitle', 'title', 'year', 'editor', 'pages', 'publisher', 'address', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url'],
        'book-chapter': ['author', 'booktitle', 'title', 'year', 'editor', 'pages', 'publisher', 'address', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url'],
        'book-proceedings': ['author', 'booktitle', 'title', 'year', 'publisher', 'publisher', 'address', 'month', 'note', 'abstract', 'language', 'isbn', 'doi', 'url'],
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
            lines.push(`@${typology_mapping[type]}{${publication._id}`);
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
                type = name;
                lines.push(`@${typology_mapping[type]}{${publication._id}`);
            } else {
                lines.push(`@misc{${publication._id}`);
            }
        }

        const obj = await transform_to_bibtex_type(publication, extra, fields_mapping[type], type);
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

async function export_information(ctx: Object): Promise<any> {
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
            format: 'string',
            type: 'html',
            style: `citation-${subtype}`,
            lang: 'en-US',
        });
        results = `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head><body>${results}</body></html>`;
        ext = '.html';
        break;
    }
    }


    const s = new Readable();
    s.push(results);
    s.push(null);

    ctx.set('Content-disposition', `attachment; filename=pos_exports${ext}`);
    ctx.statusCode = 200;
    ctx.body = s;
}
module.exports = {
    export_information,
};
