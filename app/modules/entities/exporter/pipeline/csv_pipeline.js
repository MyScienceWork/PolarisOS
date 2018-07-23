const LangUtils = require('../../../utils/lang');
const TransFunctions = require('../../../pipeline/transformer/transfunctions');

// 'abstracts.content',
// 'authors'
// 'classifications._id'
// 'contributors'
// 'delivery_institution',
// 'diffusion.internal_collection'
// 'diffusion.projects'
// 'diffusion.anr_projects'
// 'diffusion.european_projects'
// 'diffusion.research_teams'
// 'diffusion.rights.access'
// 'diffusion.rights.license'
// 'diffusion.surveys'
// 'ids'
// 'keywords'
// 'localisation.country'
// 'resources'
// 'translated_titles'
// 'type'
// 'subtype'
// 'depositor'

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
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    translated_titles: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
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
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.book_authors': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
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
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'dates.start': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'dates.end': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
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
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    abstracts: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
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
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    resources: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
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
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    keywords: {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.demovoc_keywords': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.publication_version': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.diffusion.rights.access': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'diffusion.rights.embargo': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.diffusion.rights.license': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
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
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.diffusion.internal_collection': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.diffusion.surveys': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.diffusion.projects': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.diffusion.anr_projects': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
        },
    },
    'denormalization.diffusion.european_projects': {
        __default: {
            transformers: [],
            picker: (c, pub, lang, key) => ({ [key]: c }),
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
        label: 'b_translated_titles',
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
    transformers: [{
        collection: TransFunctions.identity(true),
        'denormalization.conference': TransFunctions.identity(true),
        'dates.publication': TransFunctions.template_identity('{{moment date=__path}}', true),
        'dates.start': TransFunctions.template_identity('{{moment date=__path}}', true),
        'dates.end': TransFunctions.template_identity('{{moment date=__path}}', true),
        'dates.deposit': TransFunctions.template_identity('{{moment date=__path}}', true),
        description: TransFunctions.identity(true),
        'diffusion.rights.comment': TransFunctions.identity(true),
        'diffusion.rights.embargo': TransFunctions.template_identity('{{moment date=__path}}', true),
        'denormalization.editor': TransFunctions.identity(true),
        'denormalization.journal': TransFunctions.identity(true),
        newspaper: TransFunctions.identity(true),
        lang: TransFunctions.identity(true),
        'localisation.city': TransFunctions.identity(true),
        number: TransFunctions.identity(true),
        pagination: TransFunctions.identity(true),
        publication_title: TransFunctions.identity(true),
        'subtitles.0.content': TransFunctions.identity(true),
        'title.content': TransFunctions.identity(true),
        volume: TransFunctions.identity(true),
        url: TransFunctions.identity(true),
    },
    {
        collection: TransFunctions.flatten,
        'denormalization.conference': TransFunctions.flatten,
        'dates.publication': TransFunctions.flatten,
        'dates.start': TransFunctions.flatten,
        'dates.end': TransFunctions.flatten,
        'dates.deposit': TransFunctions.flatten,
        description: TransFunctions.flatten,
        'diffusion.rights.comment': TransFunctions.flatten,
        'diffusion.rights.embargo': TransFunctions.flatten,
        'denormalization.editor': TransFunctions.flatten,
        'denormalization.journal': TransFunctions.flatten,
        newspaper: TransFunctions.flatten,
        lang: TransFunctions.flatten,
        'localisation.city': TransFunctions.flatten,
        number: TransFunctions.flatten,
        pagination: TransFunctions.flatten,
        publication_title: TransFunctions.flatten,
        'subtitles.0.content': TransFunctions.flatten,
        'title.content': TransFunctions.flatten,
        volume: TransFunctions.flatten,
        url: TransFunctions.flatten,
    }],
    labels: {
        b_title: {
            label: 'b_title',
            order: 0,
        },
        b_subtitle: {
            label: 'b_subtitle',
            order: 1,
        },
        b_translated_titles: {
            label: 'b_translated_titles',
            order: 2,
        },
        b_lang_publication: {
            label: 'b_lang_publication',
            order: 3,
        },
        b_journal: {
            label: 'b_journal',
            order: 4,
        },
        b_conference: {
            label: 'b_conference',
            order: 5,
        },
        b_journal_press: {
            label: 'b_journal_press',
            order: 6,
        },
        b_contributor: {
            label: 'b_contributor',
            order: 7,
        },
        l_book_authors_label: {
            label: 'l_book_authors_label',
            order: 8,
        },
        b_publication_title_report: {
            label: 'b_publication_title_report',
            order: 9,
        },
        b_date_published: {
            label: 'b_date_published',
            order: 10,
        },
        b_date_production: {
            label: 'b_date_production',
            order: 11,
        },
        b_date_start_conference: {
            label: 'b_date_start_conference',
            order: 12,
        },
        b_date_end_conference: {
            label: 'b_date_end_conference',
            order: 13,
        },
        b_delivery_institution: {
            label: 'b_delivery_institution',
            order: 14,
        },
        b_city: {
            label: 'b_city',
            order: 15,
        },
        b_country: {
            label: 'b_country',
            order: 16,
        },
        b_abstract: {
            label: 'b_abstract',
            order: 17,
        },
        b_volume: {
            label: 'b_volume',
            order: 18,
        },
        b_collection_title: {
            label: 'b_collection_title',
            order: 19,
        },
        b_number: {
            label: 'b_number',
            order: 20,
        },
        b_pagination: {
            label: 'b_pagination',
            order: 21,
        },
        b_duration: {
            label: 'b_duration',
            order: 22,
        },
        b_editor: {
            label: 'b_editor',
            order: 23,
        },
        l_url_editor: {
            label: 'l_url_editor',
            order: 24,
        },
        b_publications_id: {
            label: 'b_publications_id',
            order: 25,
        },
        b_resources_url: {
            label: 'b_resources_url',
            order: 26,
        },
        b_content_description: {
            label: 'b_content_description',
            order: 27,
        },
        b_classification: {
            label: 'b_classification',
            order: 28,
        },
        b_keywords: {
            label: 'b_keywords',
            order: 29,
        },
        b_keywords_thesaurus: {
            label: 'b_keywords_thesaurus',
            order: 30,
        },
        b_publication_version: {
            label: 'b_publication_version',
            order: 31,
        },
        b_publication_access: {
            label: 'b_publication_access',
            order: 32,
        },
        b_embargo_end: {
            label: 'b_embargo_end',
            order: 33,
        },
        b_license: {
            label: 'b_license',
            order: 34,
        },
        b_rights_comments: {
            label: 'b_rights_comments',
            order: 35,
        },
        b_rights_export_on_hal: {
            label: 'b_rights_export_on_hal',
            order: 36,
        },
        b_export_to_repec: {
            label: 'b_export_to_repec',
            order: 37,
        },
        b_no_disclosure: {
            label: 'b_no_disclosure',
            order: 38,
        },
        b_research_team: {
            label: 'b_research_team',
            order: 39,
        },
        b_internal_collection: {
            label: 'b_internal_collection',
            order: 40,
        },
        b_survey: {
            label: 'b_survey',
            order: 41,
        },
        b_project: {
            label: 'b_project',
            order: 42,
        },
        l_anr_project: {
            label: 'l_anr_project',
            order: 43,
        },
        l_european_project: {
            label: 'l_european_project',
            order: 44,
        },
    },
};
