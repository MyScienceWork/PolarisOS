module.exports = {
    'title*content': {
        element: 'text',
        label: 'l_title',
    },
    'abstracts*content': {
        element: 'text',
        label: 'l_abstract',
    },
    'keywords*value': {
        element: 'text',
        label: 'l_keyword',
    },
    'demovoc_keywords*_id': {
        entity: {
            name: 'demovoc',
            label: 'label',
            value: '_id',
            translatable: false,
            // ajax: true,
            // path: '/api/public/v2/demovocs/search',
        },
        element: 'multi-select',
        placeholder: 'l_type_to_find',
        label: 'l_demovoc_keyword',
    },
    type: {
        entity: {
            name: 'typology',
            label: 'label',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_typology_type',
    },
    lang: {
        entity: {
            name: 'langref',
            label: 'label',
            value: 'value',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_lang',
    },
    'authors*_id': {
        entity: {
            name: 'author',
            label: 'fullname',
            value: '_id',
            translatable: false,
            // ajax: true,
            // path: '/api/public/v2/authors/search',
        },
        element: 'multi-select',
        placeholder: 'l_type_to_find',
        label: 'l_author',
    },
    journal: {
        entity: {
            name: 'journal',
            label: 'name',
            value: '_id',
            translatable: false,
            ajax: true,
            path: '/api/public/v2/journals/search',
            searchFields: 'name.__pauc',
        },
        element: 'multi-select',
        placeholder: 'l_type_to_find',
        label: 'l_journal',
    },
    conference: {
        entity: {
            name: 'conference',
            label: 'name',
            value: '_id',
            translatable: false,
        },
        element: 'multi-select',
        label: 'l_conference',
    },
    editor: {
        entity: {
            name: 'editor',
            label: 'label',
            value: '_id',
            translatable: false,
            ajax: true,
            path: '/api/public/v2/editors/search',
        },
        element: 'multi-select',
        placeholder: 'l_type_to_find',
        label: 'l_editor',
    },
    'classifications*_id': {
        entity: {
            name: 'subject',
            label: 'label',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_theme',
    },
    'localisation*country': {
        entity: {
            name: 'country',
            label: 'label',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_country',
    },
    'diffusion*research_team': {
        entity: {
            name: 'laboratory',
            label: 'name',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_laboratory',
    },
    'diffusion*internal_collection': {
        entity: {
            name: 'internal_collection',
            label: 'label',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_internal_collection',
    },
    'diffusion*surveys*_id': {
        entity: {
            name: 'survey',
            label: 'name',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_survey',
    },
    'diffusion*projects*_id': {
        entity: {
            name: 'project',
            label: 'name',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_project',
    },
    'diffusion*rights*license': {
        entity: {
            name: 'license',
            label: 'label',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_license',
    },
    'diffusion*rights*access': {
        entity: {
            name: 'access_level',
            label: 'label',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_access_level',
    },
    publication_version: {
        entity: {
            name: 'publication_version',
            label: 'label',
            value: '_id',
            translatable: true,
        },
        element: 'multi-select',
        label: 'l_publication_version',
    },
};
