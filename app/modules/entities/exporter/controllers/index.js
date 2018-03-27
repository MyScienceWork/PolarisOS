// @flow
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');
const Readable = require('stream').Readable;
const CSVPipeline = require('../pipeline/csv_pipeline');
const EndNotePipeline = require('../pipeline/endnote_pipeline');
const Transformer = require('../../../pipeline/transformer/transformer');
const CSVStringify = require('csv-stringify');
const moment = require('moment');
const LangUtils = require('../../../utils/lang');


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
    const ids = body.ids;

    if (type == null) {
        ctx.body = {};
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
