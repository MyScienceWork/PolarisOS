const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const Utils = require('../../../utils/utils');

const types = {
    BOOK: 'book',
    BLOG: 'other-blog',
    CHAP: 'chapter',
    COMP: 'other-software',
    CONF: 'book-proceedings',
    CPAPER: 'conference',
    DICT: 'book-chapter-dictionary-article',
    FIGURE: 'other-figure',
    GEN: 'other',
    JOUR: 'journal',
    MAP: 'other-maps',
    NEWS: 'press',
    RPRT: 'report',
    SOUND: 'other-audio',
    THES: 'thesis',
    UNPD: 'working-paper',
    VIDEO: 'other-video',
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
    AB: {
        __default: {
            picker: (abs, pub) => {
                const lang = pub.LA || 'EN';
                return { abstracts: [{ content: abs[0], lang: pub.LA }] };
            },
        },
    },
    T3: {
        __default: {
            picker: c => ({ collection: c[0] }),
        },
    },
    DA: {
        __default: {
            picker: (c) => {
                const parts = c[0].split('/');
                if (parts.length === 1) {
                    return { dates: { publication: moment(c[0], 'YYYY') } };
                } else if (parts.length === 2) {
                    return { dates: { publication: moment(c[0], 'YYYY/MM') } };
                }
                return { dates: { publication: moment(c[0], 'YYYY/MM/DD') } };
            },
        },
    },
    N1: {
        __default: {
            picker: c => ({ description: c[0] }),
        },
    },
    DO: {
        __default: {
            picker: c => ({ ids: [{ type: 'doi', _id: c[0] }] }),
        },
    },
    SN: {
        __default: {
            picker: c => ({ ids: [{ type: 'isbn', _id: c[0] }] }),
        },
    },
    T2: {
        __default: {
            transformers: [],
            picker: async pt => ({ publication_title: pt[0] }),
        },
        press: {
            picker: c => ({ newspaper: c[0] }),
        },
    },
    C3: {
        conference: {
            transformers: [],
            picker: async pt => ({ publication_title: pt[0] }),
        },
    },
    KW: {
        __default: {
            picker: kws => ({ keywords: kws.map(k => ({ type: 'user', value: k })) }),
        },
    },
    LA: {
        __default: {
            transformers: [],
            picker: l => ({ lang: l[0] }),
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
    IS: {
        __default: {
            transformers: [],
            picker: async n => ({ number: n[0] }),
        },
    },
    SP: {
        __default: {
            transformers: [],
            picker: async p => ({ pagination: p[0] }),
        },
    },
    TI: {
        __default: {
            transformers: [],
            picker: async t => ({ title: { content: t[0] } }),
        },
    },
    VL: {
        __default: {
            transformers: [],
            picker: async v => ({ volume: v[0] }),
        },
    },
    UR: {
        __default: {
            transformers: [],
            picker: async v => ({ url: v[0] }),
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

                let all = authors.concat(programmers).concat(film_directors);
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
                const editors = Utils.filterIndexes(pub.contributors, c => c.role === 'editor');
                const directors = Utils.filterIndexes(pub.contributors, c => c.role === 'director');
                all = editors.concat(directors);
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
                }

                // A3
                const producers = Utils.filterIndexes(pub.contributors, c => c.role === 'producer');
                const a3_contribs = producers.filter(idx => contribs[idx]
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
                    .map((c) => {
                        const info = c._id;
                        if (info.firstname) {
                            return `${info.lastname}, ${info.firstname}`;
                        }
                        return `${info.lastname}`;
                    });
                final.A2 = a2_contribs;
                return final;
            },
        },
    },
};


async function run(publication) {
    const final_publication = {};
    console.log('ris publication', JSON.stringify(publication));
    // const pos_type = publication.TY[0] in types ? types[publication.TY[0]] || 'other';

    return final_publication;
}

module.exports = {
    run,
};
