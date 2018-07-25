const _ = require('lodash');
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
        NEWS: {
            picker: c => ({ newspaper: c[0] }),
        },
        CPAPER: {
            picker: c => ({ conference: c[0] }),
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
    CY: {
        __default: {
            transformers: [],
            picker: async (loc, pub, mylang) => ({ localisation: { city: loc[0] } }),
        },
    },
    C1: {
        __default: {
            transformers: [],
            picker: async (loc, pub, mylang) => ({
                localisation: { city: loc[0] },
            }),
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
    PB: {
        __default: {
            transformers: [],
            picker: async v => ({ editor: v[0] }),
        },
        RPRT: {
            transformers: [],
            picker: async v => ({ delivery_institution: v[0] }),
        },
        THES: {
            transformers: [],
            picker: async v => ({ delivery_institution: v[0] }),
        },
    },
    JO: {
        __default: {
            transformers: [],
            picker: async v => ({ journal: v[0] }),
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
    let final_publication = {};
    const typology = (await EntitiesUtils.search_and_get_sources('typology', {
        size: 100,
    })).reduce((obj, typo) => {
        obj[typo.name] = typo;
        return obj;
    }, {});


    console.log('ris publication', JSON.stringify(publication));
    const ris_type = publication.TY[0];
    const pos_temporary_type = ris_type in types ? types[publication.TY[0]] : 'other';
    let pos_type = 'other';
    let pos_subtype = null;
    if (pos_temporary_type in typology) {
        pos_type = pos_temporary_type;
    } else {
        pos_subtype = pos_temporary_type;
        const possibilities = _.map(typology, (type, key) => {
            if (type.children.find(child => child.name === pos_temporary_type)) {
                return type._id;
            }
            return null;
        }).filter(rt => rt != null);
        if (possibilities.length > 0) {
            pos_type = possibilities[0];
        }
    }

    final_publication.type = pos_type;
    if (pos_subtype) {
        final_publication.subtype = pos_subtype;
    }

    for (const key in mapping) {
        const pub_info = Utils.find_value_with_path(publication, key.split('.'));
        if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
            continue;
        }

        const info = mapping[key];
        let mapper = null;
        if (ris_type in info) {
            mapper = info[ris_type];
        } else if ('__default' in info) {
            mapper = info.__default;
        }

        if (!mapper) {
            continue;
        }

        let subobj = await mapper.picker(pub_info, publication, 'EN', key);
        if (mapper.transformers.length > 0) {
            subobj = await mapper.transformers.reduce((o, tr) => {
                o = tr(o);
                return o;
            }, subobj);
        }

        final_publication = _.mergeWith(final_publication, subobj, (objValue, srcValue) => {
            if (_.isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        });
    }
    console.log('POS publication', JSON.stringify(final_publication));
    return final_publication;
}

module.exports = {
    run,
};
