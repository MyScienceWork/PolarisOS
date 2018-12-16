const moment = require('moment');
const LangUtils = require('../../../utils/lang');
const Utils = require('../../../utils/utils');
const CommonFunctions = require('./common');

const types = {
    6: 'book',
    56: 'other-blog',
    5: 'chapter',
    9: 'other-software',
    28: 'book-proceedings',
    47: 'conference',
    10: 'conference-paper-generic',
    52: 'book-chapter-dictionary-article',
    2: 'other-figure',
    13: 'other',
    17: 'journal',
    20: 'other-maps',
    23: 'press',
    27: 'report',
    61: 'other-audio',
    32: 'thesis',
    34: 'working-paper',
    3: 'other-video',
};

const mapping = {
    'abstract.0': {
        __default: {
            transformers: [],
            picker: (abs, pub) => {
                if (!abs) {
                    return [];
                }
                const lang = Utils.find_value_with_path(pub, 'language.0'.split('.')) || 'EN';
                return { abstracts: [{ content: abs, lang }] };
            },
        },
    },
    'volume.0': {
        __default: {
            transformers: [],
            picker: async v => ({ volume: v }),
        },
        thesis: {
            transformers: [],
            picker: (sub, pub) => {
                if (!sub) {
                    return [];
                }
                const lang = Utils.find_value_with_path(pub, 'language.0'.split('.')) || 'EN';
                if (sub && sub.trim() !== '') {
                    return { subtitles: [{ content: sub, lang }] };
                }
                return [];
            },
        },
    },
    'titles.0.secondary-title.0': {
        __default: {
            transformers: [],
            picker: c => ({ publication_title: c }),
        },
        journal: {
            transformers: [],
            picker: (sub, pub) => {
                if (!sub) {
                    return [];
                }
                const lang = Utils.find_value_with_path(pub, 'language.0'.split('.')) || 'EN';
                if (sub && sub.trim() !== '') {
                    return { subtitles: [{ content: sub, lang }] };
                }
                return [];
            },
        },
        'working-paper': {
            transformers: [],
            picker: c => ({ collection: c }),
        },
        press: {
            transformers: [],
            picker: c => ({ newspaper: c }),
        },
        conference: {
            transformers: [],
            picker: c => ({ conference: c }),
        },
        'conference-paper-generic': {
            transformers: [],
            picker: c => ({ conference: c }),
        },
    },
    'tertiary-title.0': {
        __default: {
            transformers: [],
            picker: c => ({ collection: c }),
        },
    },
    'dates.0.pub-dates.0.date.0': {
        __default: {
            picker: c => ({ dates: { publication: +moment(c, 'YYYY') } }),
        },
        journal: {
            picker: c => ({ dates: { publication: +moment(c, 'MM/YYYY') } }),
        },
        press: {
            picker: c => ({ dates: { publication: +moment(c, 'DD/MM/YYYY') } }),
        },
        conference: {
            picker: c => ({ dates: { publication: +moment(c, 'DD/MM/YYYY') } }),
        },
        'conference-paper-generic': {
            picker: c => ({ dates: { publication: +moment(c, 'DD/MM/YYYY') } }),
        },
    },
    'notes.0': {
        __default: {
            transformers: [],
            picker: c => ({ description: c }),
        },
    },
    'electronic-resource-num.0': {
        __default: {
            transformers: [],
            picker: doi => ({ ids: [{ _id: doi, type: 'doi' }] }),
        },
    },
    'isbn.0': {
        __default: {
            transformers: [],
            picker: doi => ({ ids: [{ _id: doi, type: 'isbn' }] }),
        },
    },
    'related-urls.0.url': {
        __default: {
            transformers: [],
            picker: doi => ({ url: doi }),
        },
    },
    'keywords.0.keyword': {
        __default: {
            transformers: [],
            picker: (kws) => {
                const all = kws.map(k => ({ type: 'user', value: k }));
                return { keywords: all };
            },
        },
    },
    'language.0': {
        __default: {
            transformers: [],
            picker: l => ({ lang: l }),
        },
    },
    'pub-location.0': {
        __default: {
            transformers: [],
            picker: async loc => ({ localisation: { city: loc } }),
        },
    },
    'number.0': {
        __default: {
            transformers: [],
            picker: async n => ({ number: n }),
        },
    },
    'custom2.0': {
        press: {
            transformers: [],
            picker: async n => ({ number: n }),
        },
    },
    'pages.0': {
        __default: {
            transformers: [],
            picker: async p => ({ pagination: p }),
        },
    },
    'custom3.0': {
        conference: {
            transformers: [],
            picker: async pt => ({ publication_title: pt }),
        },
        'conference-paper-generic': {
            transformers: [],
            picker: async pt => ({ publication_title: pt }),
        },
    },
    'titles.title.0': {
        __default: {
            transformers: [],
            picker: async (t, pub) => {
                const lang = Utils.find_value_with_path(pub, 'language.0'.split('.')) || 'EN';
                return { title: { content: t, lang } };
            },
        },
    },
    'titles.translated-title.0': {
        __default: {
            transformers: [],
            picker: async tts => ({ translated_titles: [{ content: tts }] }),
        },
    },
    'publisher.0': {
        __default: {
            transformers: [],
            picker: async v => ({ editor: v }),
        },
        report: {
            transformers: [],
            picker: async v => ({ delivery_institution: v }),
        },
        thesis: {
            transformers: [],
            picker: async v => ({ delivery_institution: v }),
        },
    },
    'periodical.full-title.0': {
        __default: {
            transformers: [],
            picker: async pt => ({ journal: pt }),
        },
    },
    'contributors.0.authors.author': {
        __default: {
            transformers: [],
            picker: async contribs => ({ contributors: contribs.map(c => ({ label: c, role: 'author' })) }),
        },
    },
    'contributors.0.secondary-authors.author': {
        __default: {
            transformers: [],
            picker: async contribs => ({ contributors: contribs.map(c => ({ label: c, role: 'organiser' })) }),
        },
        chapter: {
            transformers: [],
            picker: async contribs => ({ book_authors: contribs.map(c => ({ _id: c })) }),
        },
    },
    'contributors.0.tertiary-authors.author': {
        __default: {
            transformers: [],
            picker: async contribs => ({ contributors: contribs.map(c => ({ label: c, role: 'producer' })) }),
        },
        thesis: {
            transformers: [],
            picker: async contribs => ({ contributors: contribs.map(c => ({ label: c, role: 'supervisor-thesis' })) }),
        },
    },
};

async function run(publication, typology, idx, maps) {
    let final_publication = {};
    const endnote_type = Utils.find_value_with_path(publication, 'ref-type._'.split('.')) || null;

    const pos_temporary_type = endnote_type in types ? types[endnote_type] : 'other';
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
        if (pos_temporary_type in info) {
            mapper = info[pos_temporary_type];
        } else if ('__default' in info) {
            mapper = info.__default;
        }

        if (!mapper) {
            continue;
        }

        let subobj = await mapper.picker(pub_info, publication,
            publication.LA ? publication.LA[0] : 'EN', key);
        if (mapper.transformers.length > 0) {
            subobj = await mapper.transformers.reduce((o, tr) => {
                o = tr(o);
                return o;
            }, subobj);
        }

        final_publication = Utils.merge_with_concat(final_publication, subobj);
    }

    const srefs = [['editor', 'editor'], ['journal', 'journal'],
        ['institution', 'delivery_institution'],
        ['conference', 'conference']];
    const lrefs = [['author', 'contributors', 'label'], ['author', 'book_authors', '_id']];

    for (const info of srefs) {
        const [type, path] = info;
        maps = await CommonFunctions.single_ref(type, path, final_publication, idx, maps);
    }

    for (const info of lrefs) {
        const [type, list_path, path] = info;
        maps = await CommonFunctions.list_ref(type, list_path, path, final_publication, idx, maps);
    }
    return final_publication;
}

module.exports = {
    run,
    queries: {
        author: CommonFunctions.contributor_search,
        journal: CommonFunctions.match_search('name'),
        conference: CommonFunctions.match_search('name'),
        editor: CommonFunctions.match_search('label'),
        institution: CommonFunctions.match_search('name'),
    },
};
