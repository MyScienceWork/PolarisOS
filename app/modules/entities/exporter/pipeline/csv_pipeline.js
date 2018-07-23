const moment = require('moment');
const LangUtils = require('../../../utils/lang');

const mapping = {
    'denormalization.type.label': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const type = await LangUtils.string_to_translation(c, lang);
                return { [key]: type };
            },
        },
    },
    subtype: {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const type = await LangUtils.string_to_translation(`l_${c.replace(/-/gi, '_')}`, lang);
                return { [key]: type };
            },
        },
    },
    'title.content': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    subtitles: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c.filter(sub => sub && sub.lang && sub.content && sub.content.trim() !== '')
                                  .map(sub => `(${sub.lang}) ${sub.content.trim()}`).join('\n') }),
        },
    },
    translated_titles: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c.filter(sub => sub && sub.lang && sub.content && sub.content.trim() !== '')
                                  .map(sub => `(${sub.lang}) ${sub.content.trim()}`).join('\n') }),
        },
    },
    lang: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.journal': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.conference': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    newspaper: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.contributors': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const info = c.filter(co => co && co.label).map((co) => {
                    let str = co.label.fullname;
                    if (co.role.abbreviation) {
                        str += ` (#POS#LANG${co.role.abbreviation})`;
                    }
                    return str;
                }).join(', ');
                const translated = await LangUtils.strings_to_translation(info, lang);
                return { [key]: translated };
            },
        },
    },
    'denormalization.book_authors': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const info = c.filter(co => co && co._id).map((co) => {
                    let str = co._id.fullname;
                    if (co.role.abbreviation) {
                        str += ` (#POS#LANG${co.role.abbreviation})`;
                    }
                    return str;
                }).join(', ');
                const translated = await LangUtils.strings_to_translation(info, lang);
                return { [key]: translated };
            },
        },
    },
    publication_title: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'dates.publication': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'dates.production': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: moment.utc(c).format('YYYY-MM-DD') }),
        },
    },
    'dates.start': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: moment.utc(c).format('YYYY-MM-DD') }),
        },
    },
    'dates.end': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: moment.utc(c).format('YYYY-MM-DD') }),
        },
    },
    'denormalization.delivery_institution': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'localisation.city': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.localisation.country': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const country = await LangUtils.string_to_translation(c, lang);
                return { [key]: country };
            },
        },
    },
    abstracts: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c.filter(sub => sub && sub.lang && sub.content && sub.content.trim() !== '')
                                  .map(sub => `(${sub.lang}) ${sub.content.trim()}`).join('\n---\n') }),
        },
    },
    volume: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    collection: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    number: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    pagination: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    duration: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.editor': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    url: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    ids: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({
                [key]: c.map(id => `(${id.type}) ${id._id}`).join('\n'),
            }),
        },
    },
    resources: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({
                [key]: c.map(id => `(${id.type}) ${id.url}`).join('\n'),
            }),
        },
    },
    description: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.classifications': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.filter(cl => cl != null && cl._id != null).map(cl => `#POS#LANG${cl._id.label}`).join('\n');
                return { [key]: await LangUtils.strings_to_translation(all, lang) };
            },
        },
    },
    keywords: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({
                [key]: c.map(k => k.value).join(' | '),
            }),
        },
    },
    'denormalization.demovoc_keywords': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c.map(k => k._id.label).join(' | ') }),
        },
    },
    'denormalization.publication_version': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const translated = await LangUtils.string_to_translation(c, lang);
                return { [key]: translated };
            },
        },
    },
    'denormalization.diffusion.rights.access': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const translated = await LangUtils.string_to_translation(c, lang);
                return { [key]: translated };
            },
        },
    },
    'diffusion.rights.embargo': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: moment.utc(c).format('YYYY-MM-DD') }),
        },
    },
    'denormalization.diffusion.rights.license': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const translated = await LangUtils.string_to_translation(c, lang);
                return { [key]: translated };
            },
        },
    },
    'diffusion.rights.comment': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'diffusion.rights.exports.hal': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'diffusion.rights.exports.repec': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'diffusion.rights.exports.nowhere': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.diffusion.research_teams': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.map(rt => `#POS#LANG${rt._id.name}`).join('\n');
                const translated = await LangUtils.strings_to_translation(all, lang);
                return { [key]: translated };
            },
        },
    },
    'denormalization.diffusion.internal_collection': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => ({ [key]: await LangUtils.string_to_translation(c, lang) }),
        },
    },
    'denormalization.diffusion.surveys': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.map(rt => `#POS#LANG${rt._id.name}`).join('\n');
                const translated = await LangUtils.strings_to_translation(all, lang);
                return { [key]: translated };
            },
        },
    },
    'denormalization.diffusion.projects': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.map(rt => `#POS#LANG${rt._id.name}`).join('\n');
                const translated = await LangUtils.strings_to_translation(all, lang);
                return { [key]: translated };
            },
        },
    },
    'denormalization.diffusion.anr_projects': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.map(rt => `#POS#LANG${rt._id.name}`).join('\n');
                const translated = await LangUtils.strings_to_translation(all, lang);
                return { [key]: translated };
            },
        },
    },
    'denormalization.diffusion.european_projects': {
        __default: {
            transformers: [],
            picker: async (c, pub, lang, key) => {
                const all = c.map(rt => `#POS#LANG${rt._id.name}`).join('\n');
                const translated = await LangUtils.strings_to_translation(all, lang);
                return { [key]: translated };
            },
        },
    },
};

const labels = {
    'denormalization.type.label': {
        label: 'l_typology_type',
        order: 0,
    },
    subtype: {
        label: 'l_typology_subtype',
        order: 1,
    },
    'title.content': {
        label: 'b_title',
        order: 2,
    },
    subtitles: {
        label: 'b_subtitle',
        order: 3,
    },
    translated_titles: {
        label: 'b_translated_title',
        order: 4,
    },
    lang: {
        label: 'b_lang_publication',
        order: 5,
    },
    'denormalization.journal': {
        label: 'b_journal',
        order: 6,
    },
    'denormalization.conference': {
        label: 'b_conference',
        order: 7,
    },
    newspaper: {
        label: 'b_journal_press',
        order: 8,
    },
    'denormalization.contributors': {
        label: 'b_contributor',
        order: 9,
    },
    'denormalization.book_authors': {
        label: 'l_book_authors_label',
        order: 10,
    },
    publication_title: {
        label: 'b_publication_title_report',
        order: 11,
    },
    'dates.publication': {
        label: 'b_date_published',
        order: 12,
    },
    'dates.production': {
        label: 'b_date_production',
        order: 13,
    },
    'dates.start': {
        label: 'b_date_start_conference',
        order: 14,
    },
    'dates.end': {
        label: 'b_date_end_conference',
        order: 15,
    },
    'denormalization.delivery_institution': {
        label: 'b_delivery_institution',
        order: 16,
    },
    'localisation.city': {
        label: 'b_city',
        order: 17,
    },
    'denormalization.localisation.country': {
        label: 'b_country',
        order: 18,
    },
    abstracts: {
        label: 'b_abstract',
        order: 19,
    },
    volume: {
        label: 'b_volume',
        order: 20,
    },
    collection: {
        label: 'b_collection_title',
        order: 21,
    },
    number: {
        label: 'b_number',
        order: 22,
    },
    pagination: {
        label: 'b_pagination',
        order: 23,
    },
    duration: {
        label: 'b_duration',
        order: 24,
    },
    'denormalization.editor': {
        label: 'b_editor',
        order: 25,
    },
    url: {
        label: 'l_url_editor',
        order: 26,
    },
    ids: {
        label: 'b_publications_id',
        order: 27,
    },
    resources: {
        label: 'b_resources_url',
        order: 28,
    },
    description: {
        label: 'b_content_description',
        order: 29,
    },
    'denormalization.classifications': {
        label: 'b_classification',
        order: 30,
    },
    keywords: {
        label: 'b_keywords',
        order: 31,
    },
    'denormalization.demovoc_keywords': {
        label: 'b_keywords_thesaurus',
        order: 32,
    },
    'denormalization.publication_version': {
        label: 'b_publication_version',
        order: 33,
    },
    'denormalization.diffusion.rights.access': {
        label: 'b_publication_access',
        order: 34,
    },
    'diffusion.rights.embargo': {
        label: 'b_embargo_end',
        order: 35,
    },
    'denormalization.diffusion.rights.license': {
        label: 'b_license',
        order: 36,
    },
    'diffusion.rights.comment': {
        label: 'b_rights_comments',
        order: 37,
    },
    'diffusion.rights.exports.hal': {
        label: 'b_rights_export_on_hal',
        order: 38,
    },
    'diffusion.rights.exports.repec': {
        label: 'b_export_to_repec',
        order: 39,
    },
    'diffusion.rights.exports.nowhere': {
        label: 'b_no_disclosure',
        order: 40,
    },
    'denormalization.diffusion.research_teams': {
        label: 'b_research_team',
        order: 41,
    },
    'denormalization.diffusion.internal_collection': {
        label: 'b_internal_collection',
        order: 42,
    },
    'denormalization.diffusion.surveys': {
        label: 'b_survey',
        order: 43,
    },
    'denormalization.diffusion.projects': {
        label: 'b_project',
        order: 44,
    },
    'denormalization.diffusion.anr_projects': {
        label: 'l_anr_project',
        order: 45,
    },
    'denormalization.diffusion.european_projects': {
        label: 'l_european_project',
        order: 46,
    },
};

module.exports = {
    mapping,
    labels,
};
