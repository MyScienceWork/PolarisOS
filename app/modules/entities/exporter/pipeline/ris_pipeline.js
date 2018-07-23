const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const Utils = require('../../../utils/utils');

const types = {
    book: 'BOOK',
    'other-blog': 'BLOG',
    chapter: 'CHAP',
    'other-software': 'COMP',
    'book-proceedings': 'BOOK',
    conference: 'CPAPER',
    'book-chapter-dictionary-article': 'DICT',
    'other-figure': 'FIGURE',
    other: 'GEN',
    journal: 'JOUR',
    'other-maps': 'MAP',
    press: 'NEWS',
    report: 'RPRT',
    'other-audio': 'SOUND',
    thesis: 'THES',
    'working-paper': 'RPRT',
    'other-video': 'VIDEO',
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
                    return { AB: abs[0].content };
                }
                return { AB: a.content };
            },
        },
    },
    subtitles: {
        __default: {
            transformers: [],
            picker: () => {},
        },
        THES: {
            transformers: [],
            picker: (sub) => {
                if (sub.length === 0) {
                    return null;
                }

                const subtitle = sub[0].content;

                if (subtitle && subtitle.trim() !== '') {
                    return { M3: subtitle };
                }
                return null;
            },
        },
    },
    collection: {
        __default: {
            transformers: [],
            picker: c => ({ T3: c }),
        },
    },
    'dates.publication': {
        __default: {
            transformers: [o => ({ DA: moment(o.DA).format('YYYY') })],
            picker: c => ({ DA: c }),
        },
        JOUR: {
            transformers: [o => ({ DA: moment(o.DA).format('YYYY/MM') })],
            picker: c => ({ DA: c }),
        },
        NEWS: {
            transformers: [o => ({ DA: moment(o.DA).format('YYYY/MM/DD') })],
            picker: c => ({ DA: c }),
        },
    },
    description: {
        __default: {
            transformers: [],
            picker: c => ({ N1: c }),
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
                    o.DO = DOI._id;
                }
                if (ISBN) {
                    o.SN = ISBN._id;
                }
                if (HANDLE) {
                    o.AN = HANDLE._id;
                }
                return o;
            },
        },
    },
    newspaper: {
        __default: {
            transformers: [],
            picker: c => ({
                T2: c,
            }),
        },
    },
    keywords: {
        __default: {
            transformers: [],
            picker: (kws) => {
                const all = kws.map(k => k.value);
                return { KW: all };
            },
        },
    },
    lang: {
        __default: {
            transformers: [],
            picker: l => ({ LA: l }),
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
                    CY: final,
                };
            },
        },
        CPAPER: {
            transformers: [],
            picker: async (loc, pub, mylang) => {
                const final = await city_country_picker(loc, pub, mylang);
                if (!final) {
                    return {};
                }
                return {
                    C1: final,
                };
            },
        },
    },
    number: {
        __default: {
            transformers: [],
            picker: async n => ({ IS: n }),
        },
    },
    pagination: {
        __default: {
            transformers: [],
            picker: async p => ({ SP: p }),
        },
    },
    publication_title: {
        __default: {
            transformers: [],
            picker: async pt => ({ T2: pt }),
        },
        CPAPER: {
            transformers: [],
            picker: async pt => ({ C3: pt }),
        },
    },
    'title.content': {
        __default: {
            transformers: [],
            picker: async t => ({ TI: t }),
        },
    },
    translated_titles: {
        __default: {
            transformers: [],
            picker: async tts => ({ TT: tts[0].content }),
        },
    },
    volume: {
        __default: {
            transformers: [],
            picker: async v => ({ VL: v }),
        },
    },
    url: {
        __default: {
            transformers: [],
            picker: async v => ({ UR: v }),
        },
    },
    'denormalization.delivery_institution': {
        __default: {
            transformers: [],
            picker: async () => ({}),
        },
        RPRT: {
            transformers: [],
            picker: async v => ({ PB: v }),
        },
        THES: {
            transformers: [],
            picker: async v => ({ PB: v }),
        },
    },
    'denormalization.editor': {
        __default: {
            transformers: [],
            picker: async v => ({ PB: v }),
        },
    },
    'denormalization.journal': {
        __default: {
            transformers: [],
            picker: async v => ({ T2: v, JO: v }),
        },
    },
    'denormalization.demovoc_keywords': {
        __default: {
            transformers: [],
            picker: async (kws) => {
                const all = kws.map(k => k._id.label);
                return { KW: all };
            },
        },
    },
    'denormalization.conference': {
        CPAPER: {
            transformers: [],
            picker: async c => ({ T2: c }),
        },
    },
    'denormalization.contributors': {
        __default: {
            transformers: [],
            picker: async (contribs, pub) => {
                const final = {};

                // AU
                const authors = Utils.filterIndexes(pub.contributors, c => (c.role === 'author' || !c.role));
                const programmers = Utils.filterIndexes(pub.contributors, c => (c.role === 'programmer'));
                const film_directors = Utils.filterIndexes(pub.contributors, c => (c.role === 'film-director'));

                const all = authors.concat(programmers).concat(film_directors);
                all.sort();
                const au_contribs = all.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        if (info.firstname) {
                            return `${contribs[idx].label.lastname}, ${contribs[idx].label.firstname}`;
                        }
                        return `${contribs[idx].label.lastname}`;
                    });

                if (au_contribs.length > 0) {
                    final.AU = au_contribs;
                }

                // A2
                /* all = editors.concat(directors);
                all.sort();
                const a2_contribs = all.filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        if (info.firstname) {
                            return `${contribs[idx].label.lastname}, ${contribs[idx].label.firstname}`;
                        }
                        return `${contribs[idx].label.lastname}`;
                    });

                if (a2_contribs.length > 0) {
                    final.A2 = a2_contribs;
                }*/

                // A3
                const directors = Utils.filterIndexes(pub.contributors, c => c.role === 'director');
                const editors = Utils.filterIndexes(pub.contributors, c => c.role === 'editor');
                const producers = Utils.filterIndexes(pub.contributors, c => c.role === 'producer');
                const a3_contribs = directors.concat(producers).concat(editors).filter(idx => contribs[idx]
                    && contribs[idx].label && contribs[idx].label.lastname)
                    .map((idx) => {
                        const info = contribs[idx].label;
                        if (info.firstname) {
                            return `${contribs[idx].label.lastname}, ${contribs[idx].label.firstname}`;
                        }
                        return `${contribs[idx].label.lastname}`;
                    });

                if (a3_contribs.length > 0) {
                    final.A3 = a3_contribs;
                }
                return final;
            },
        },
    },
    'denormalization.book_authors': {
        __default: {
            transformers: [],
            picker: async (contribs) => {
                const final = {};
                // A2
                const a2_contribs = contribs
                    .filter(c => c != null)
                    .map((c) => {
                        const info = c._id;
                        if (!info) {
                            return null;
                        }

                        if (info.firstname) {
                            return `${info.lastname}, ${info.firstname}`;
                        }
                        return `${info.lastname}`;
                    }).filter(c => c != null);
                final.A2 = a2_contribs;
                return final;
            },
        },
    },
};

module.exports = { types, mapping };
