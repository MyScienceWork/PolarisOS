const _ = require('lodash');
const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');

async function find_in_mapping(type, field, content, keep = '_id') {
    const results = await EntitiesUtils.search_and_get_sources(type,
            { where: { [field]: { $match: { query: content, minimum_should_match: '100%' } } }, size: 1 });

    if (results.length > 0) {
        return results[0][keep];
    }
    return null;
}

async function find_contributor(type, content, keep = '_id') {
    const parts = content.split(',').map(c => c.trim());

    if (parts.length === 0) {
        return null;
    }
    const search = {};
    if (parts.length === 1) {
        search.lastname = { $match: { query: parts[0], minimum_should_match: '100%' } };
    } else {
        search.$or = [{
            $and: [{ fisrtname: { $match: { query: parts[0], minimum_should_match: '100%' } } },
                { lastname: { $match: { query: parts[1], minimum_should_match: '100%' } } }],
        }, {
            $and: [{ fisrtname: { $match: { query: parts[1], minimum_should_match: '100%' } } },
                { lastname: { $match: { query: parts[0], minimum_should_match: '100%' } } }],
        }];
    }

    const results = await EntitiesUtils.search_and_get_sources(type, {
        where: search,
        size: 1,
    });

    if (results.length > 0) {
        return results[0][keep];
    }
    return null;
}

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
            transformers: [],
            picker: (abs, pub) => {
                const lang = pub.LA ? pub.LA[0] : 'EN';
                return { abstracts: [{ content: abs[0], lang }] };
            },
        },
    },
    T3: {
        __default: {
            transformers: [],
            picker: c => ({ collection: c[0] }),
        },
    },
    DA: {
        __default: {
            transformers: [],
            picker: (c) => {
                const parts = c[0].split('/');
                if (parts.length === 1) {
                    return { dates: { publication: +moment(c[0], 'YYYY') } };
                } else if (parts.length === 2) {
                    return { dates: { publication: +moment(c[0], 'YYYY/MM') } };
                }
                return { dates: { publication: +moment(c[0], 'YYYY/MM/DD') } };
            },
        },
    },
    N1: {
        __default: {
            transformers: [],
            picker: c => ({ description: c[0] }),
        },
    },
    DO: {
        __default: {
            transformers: [],
            picker: c => ({ ids: [{ type: 'doi', _id: c[0] }] }),
        },
    },
    SN: {
        __default: {
            transformers: [],
            picker: c => ({ ids: [{ type: 'isbn', _id: c[0] }] }),
        },
    },
    T2: {
        __default: {
            transformers: [],
            picker: async pt => ({ publication_title: pt[0] }),
        },
        NEWS: {
            transformers: [],
            picker: c => ({ newspaper: c[0] }),
        },
        CPAPER: {
            transformers: [],
            picker: async c => ({ conference: await find_in_mapping('conference', 'name', c[0]) }),
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
            transformers: [],
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
            picker: async (t, pub) => ({ title: { content: t[0], lang: pub.LA ? pub.LA[0] : 'EN' } }),
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
            picker: async v => ({ editor: await find_in_mapping('editor', 'label', v[0]) }),
        },
        RPRT: {
            transformers: [],
            picker: async v => ({ delivery_institution: await find_in_mapping('institution', 'name', v[0]) }),
        },
        THES: {
            transformers: [],
            picker: async v => ({ delivery_institution: await find_in_mapping('institution', 'name', v[0]) }),
        },
    },
    JO: {
        __default: {
            transformers: [],
            picker: async v => ({ journal: await find_in_mapping('journal', 'name', v[0]) }),
        },
    },
    AU: {
        __default: {
            transformers: [],
            picker: async (contribs, pub) => {
                const results = await Promise.all(contribs.map(c => find_contributor('author', c)));
                return { contributors: results.filter(c => c != null).map(c => ({ label: c, role: 'author' })) };
            },
        },
        COMP: {
            transformers: [],
            picker: async (contribs, pub) => {
                const results = await Promise.all(contribs.map(c => find_contributor('author', c)));
                return { contributors: results.filter(c => c != null).map(c => ({ label: c, role: 'programmer' })) };
            },
        },
    },
    A2: {
        __default: {
            transformers: [],
            picker: async (contribs) => {
                const results = await Promise.all(contribs.map(c => find_contributor('author', c)));
                return { contributors: results.filter(c => c != null).map(c => ({ label: c, role: 'editor' })) };
            },
        },
        CHAP: {
            transformers: [],
            picker: async (contribs) => {
                const results = await Promise.all(contribs.map(c => find_contributor('author', c)));
                return { book_authors: results.filter(c => c != null).map(c => ({ _id: c, role: 'editor' })) };
            },
        },
    },
    A3: {
        __default: {
            transformers: [],
            picker: async (contribs) => {
                const results = await Promise.all(contribs.map(c => find_contributor('author', c)));
                return { contributors: results.filter(c => c != null).map(c => ({ label: c, role: 'producer' })) };
            },
        },
    },
};


async function run(publication, typology) {
    let final_publication = {};
    const ris_type = publication.TY[0];
    const pos_temporary_type = ris_type in types ? types[publication.TY[0]] : 'other';
    let pos_type = 'other';
    let pos_subtype = null;
    if (pos_temporary_type in typology) {
        pos_type = typology[pos_temporary_type]._id;
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
    return final_publication;
}

module.exports = {
    run,
};
