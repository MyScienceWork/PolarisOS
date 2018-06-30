const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const Utils = require('../../../utils/utils');

const types = {
    book: 'book',
    'other-blog': 'post-weblog',
    chapter: 'chapter',
    'other-software': 'article',
    'book-proceedings': 'chapter',
    conference: 'paper-conference',
    'book-chapter-dictionary-article': 'entry-dictionary',
    'other-figure': 'graphic',
    other: 'article',
    journal: 'article-journal',
    'other-maps': 'map',
    press: 'article-newspaper',
    report: 'report',
    'other-audio': 'song',
    thesis: 'thesis',
    'working-paper': 'article',
    'other-video': 'motion_picture',
};

async function city_country_picker(loc, pub, mylang) {
    if (!loc.country && !loc.city) {
        return {};
    }

    let country = null;
    let city = null;
    if (loc.country) {
        country = await LangUtils
            .string_to_translation(pub.denormalization.localisation.country, mylang);
    }

    if (loc.city) {
        city = loc.city;
    }

    if (country && city) {
        return `${city}, ${country}`;
    } else if (country) {
        return country;
    } else if (city) {
        return city;
    }
    return null;
}

function intify_dateparts(dateparts) {
    return dateparts.map(parts => parts.map(p => parseInt(p, 10)));
}

const mapping = {
    abstracts: {
        __default: {
            transformers: [],
            picker: (abs, pub) => {
                if (abs.length === 0) {
                    return null;
                }
                const a = abs.find(_a => _a.lang === pub.lang);
                if (!a) {
                    return { abstract: abs[0].content };
                }
                return { abstract: a.content };
            },
        },
    },
    collection: {
        __default: {
            transformers: [],
            picker: c => ({ 'collection-title': c }),
        },
    },
    'dates.publication': {
        __default: {
            transformers: [(o) => {
                const m = moment(o.issued);
                return { issued: { 'date-parts': intify_dateparts([[m.format('YYYY'), 10]]) } };
            }],
            picker: c => ({ issued: c }),
        },
        'article-journal': {
            transformers: [(o) => {
                const m = moment(o.issued);
                return { issued: { 'date-parts': intify_dateparts([[m.format('YYYY'), m.format('MM')]]) } };
            }],
            picker: c => ({ issued: c }),
        },
        'article-newspaper': {
            transformers: [(o) => {
                const m = moment(o.issued);
                return { issued: { 'date-parts': intify_dateparts([[m.format('YYYY'), m.format('MM'), m.format('DD')]]) } };
            }],
            picker: c => ({ issued: c }),
        },
    },
    dates: {
        'paper-conference': {
            transformers: [(o) => {
                if (!o) {
                    return null;
                }

                const start = moment(o['event-date'][0]);
                const end = o['event-date'].length === 2 ? moment(o['event-date'][1]) : null;

                const obj = { 'event-date': { 'date-parts': [[start.format('YYYY'), start.format('MM'), start.format('DD')]] } };
                if (end) {
                    obj['event-date']['date-parts'].push([end.format('YYYY'), end.format('MM'), end.format('DD')]);
                }
                obj['event-date']['date-parts'] = intify_dateparts(obj['event-date']['date-parts']);
                return obj;
            }],
            picker: (dates) => {
                const start = dates.start;
                const end = dates.end;
                if (!start) {
                    return null;
                }

                const obj = { 'event-date': [start] };
                if (end) {
                    obj['event-date'].push(end);
                }
                return obj;
            },
        },
    },
    description: {
        __default: {
            transformers: [],
            picker: c => ({ note: c }),
        },
    },
    ids: {
        __default: {
            transformers: [],
            picker: (ids) => {
                const DOI = ids.find(id => id.type === 'doi');
                const ISBN = ids.find(id => id.type === 'isbn');
                const HANDLE = ids.find(id => id.type === 'handle');
                const o = {};
                if (DOI) {
                    o.DOI = DOI._id;
                }
                if (ISBN) {
                    o.ISBN = ISBN._id;
                }
                if (HANDLE) {
                    o['archive-location'] = HANDLE._id;
                }
                return o;
            },
        },
    },
    newspaper: {
        __default: {
            transformers: [],
            picker: c => ({
                'container-title': c,
            }),
        },
    },
    /* keywords: {
        __default: {
            transformers: [],
            picker: (kws) => {
                const all = kws.map(k => k.value);
                return { KW: all };
            },
        },
    },*/
    lang: {
        __default: {
            transformers: [],
            picker: l => ({ language: l }),
        },
    },
    localisation: {
        __default: {
            transformers: [],
            picker: async (loc, pub, mylang) => {
                const final = await city_country_picker(loc, pub, mylang);
                if (!final) {
                    return {};
                }
                return {
                    'publisher-place': final,
                };
            },
        },
        'paper-conference': {
            transformers: [],
            picker: async (loc, pub, mylang) => {
                const final = await city_country_picker(loc, pub, mylang);
                if (!final) {
                    return {};
                }
                return {
                    'event-place': final,
                };
            },
        },
    },
    number: {
        __default: {
            transformers: [],
            picker: async n => ({ number: n }),
        },
    },
    pagination: {
        __default: {
            transformers: [],
            picker: async p => ({ page: p }),
        },
    },
    publication_title: {
        __default: {
            transformers: [],
            picker: async pt => ({ 'container-title': pt }),
        },
    },
    'title.content': {
        __default: {
            transformers: [],
            picker: async t => ({ title: t }),
        },
    },
    /* translated_titles: {
        __default: {
            transformers: [],
            picker: async tts => ({ TT: tts[0].content }),
        },
    },*/
    volume: {
        __default: {
            transformers: [],
            picker: async v => ({ volume: v }),
        },
    },
    url: {
        __default: {
            transformers: [],
            picker: async v => ({ URL: v }),
        },
    },
    'denormalization.delivery_institution': {
        __default: {
            transformers: [],
            picker: async () => ({}),
        },
        report: {
            transformers: [],
            picker: async v => ({ publisher: v }),
        },
        thesis: {
            transformers: [],
            picker: async v => ({ publisher: v }),
        },
    },
    'denormalization.editor': {
        __default: {
            transformers: [],
            picker: async v => ({ edition: v }),
        },
    },
    'denormalization.journal': {
        __default: {
            transformers: [],
            picker: async () => ({}),
        },
        'article-journal': {
            transformers: [],
            picker: async v => ({ 'container-title': v }),
        },
    },
    /* 'denormalization.demovoc_keywords': {
        __default: {
            transformers: [],
            picker: async (kws) => {
                const all = kws.map(k => k._id.label);
                return { KW: all };
            },
        },
    },*/
    'denormalization.conference': {
        'paper-conference': {
            transformers: [],
            picker: async c => ({ event: c }),
        },
    },
    'denormalization.contributors': {
        __default: {
            transformers: [],
            picker: async (contribs, pub) => {
                const grabber = all => all.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.firstname
                    && contribs[idx].label.lastname)
                    .map(idx => ({ family: contribs[idx].label.lastname,
                        given: contribs[idx].label.firstname }));

                const final = {};

                // AU
                const authors = Utils.filterIndexes(pub.contributors, c => (c.role === 'author' || !c.role));
                const film_directors = Utils.filterIndexes(pub.contributors, c => (c.role === 'film-director'));
                const coordinators = Utils.filterIndexes(pub.contributors, c => (c.role === 'coordinator'));
                const editors = Utils.filterIndexes(pub.contributors, c => c.role === 'editor');
                const directors = Utils.filterIndexes(pub.contributors, c => c.role === 'director');
                const illustrators = Utils.filterIndexes(pub.contributors, c => c.role === 'illustrator');
                const translators = Utils.filterIndexes(pub.contributors, c => c.role === 'translator');
                const interviewers = Utils.filterIndexes(pub.contributors, c => c.role === 'interviewer');

                const fallback_authors = authors.concat(coordinators);
                fallback_authors.sort();
                const all = { author: fallback_authors,
                    director: directors,
                    editor: editors,
                    interviewer: interviewers,
                    illustrator: illustrators,
                    translator: translators };

                if (directors.length === 0) {
                    all.director = film_directors;
                }

                Object.keys(all).forEach((a) => {
                    const end = grabber(all[a]);
                    if (end.length > 0) {
                        final[a] = end;
                    }
                });

                return final;
            },
        },
    },
    'denormalization.book_authors': {
        __default: {
            transformers: [],
            picker: async (contribs, pub) => {
                const final = {};
                const book_contribs = contribs.filter(c => c._id).map(c => ({ family: c._id.lastname,
                    given: c._id.firstname }));
                final['container-author'] = book_contribs;
                return final;
            },
        },
    },
};

module.exports = { types, mapping };
