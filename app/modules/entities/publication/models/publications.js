// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const PubMapping = require('../../../../mappings/publication');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');
const EntitiesUtils = require('../../../utils/entities');
const moment = require('moment');
const Utils = require('../../../utils/utils');
const XMLUtils = require('../../../utils/xml');
const Importers = require('../../importer/controllers');

// Pipelines
const PipelineTypeFiles = require('./pipeline_type_files');
const PipelineDiffusion = require('./pipeline_diffusion');

const Mapping: Object = PubMapping.msw.mappings.publication.properties;

const Validation: Array<any> = [
    {
        title: Joi.object({
            content: Joi.string().required().label('title'),
        }),
        dates: Joi.object({
            publication: Joi.number().required().label('dates.publication'),
        }),
    },
    Joi.object({
        contributors: Joi.array().min(1).required().items(Joi.any().required()).label('contributors'),
        lang: Joi.string().required().label('lang'),
    }),
];

const Formatting: Array<any> = [
    {
        abstracts: a => FormatFunctions.oarray_to_array(a),
        classifications: a => FormatFunctions.oarray_to_array(a),
        contributors: a => FormatFunctions.oarray_to_array(a),
        'diffusion.projects': a => FormatFunctions.oarray_to_array(a),
        'diffusion.anr_projects': a => FormatFunctions.oarray_to_array(a),
        'diffusion.european_projects': a => FormatFunctions.oarray_to_array(a),
        'diffusion.surveys': a => FormatFunctions.oarray_to_array(a),
        'diffusion.research_teams': a => FormatFunctions.oarray_to_array(a),
        files: a => FormatFunctions.oarray_to_array(a),
        ids: a => FormatFunctions.oarray_to_array(a),
        keywords: a => FormatFunctions.oarray_to_array(a),
        demovoc_keywords: a => FormatFunctions.oarray_to_array(a),
        resources: a => FormatFunctions.oarray_to_array(a),
        sources: a => FormatFunctions.oarray_to_array(a),
        subtitles: a => FormatFunctions.oarray_to_array(a),
        translated_titles: a => FormatFunctions.oarray_to_array(a),
        parents: async (result, object) => {
            if ('parent' in object && !result.find(p => p === object.parent)) {
                result.push({ _id: object.parent });
                /* const pub = await EntitiesUtils.retrieve(object.parent, 'publication');
                if (pub) {
                    pub.source.has_other_version = true;
                    await pub.oupdate();
                }*/
            }
            return result;
        },
    },
    {
        version: async (result, object) => (object.parents ? object.parents.length + 1 : 1),
    },
    {
        abstracts: FormatFunctions.filter_empty_or_null_objects,
        subtitles: FormatFunctions.filter_empty_or_null_objects,
        translated_titles: FormatFunctions.filter_empty_or_null_objects,
        files: FormatFunctions.filter_empty_or_null_objects,
        classifications: FormatFunctions.filter_empty_or_null_objects,
        contributors: FormatFunctions.filter_empty_or_null_objects,
        'diffusion.projects': FormatFunctions.filter_empty_or_null_objects,
        'diffusion.anr_projects': FormatFunctions.filter_empty_or_null_objects,
        'diffusion.european_projects': FormatFunctions.filter_empty_or_null_objects,
        'diffusion.surveys': FormatFunctions.filter_empty_or_null_objects,
        'diffusion.research_teams': FormatFunctions.filter_empty_or_null_objects,
        ids: FormatFunctions.filter_empty_or_null_objects,
        keywords: FormatFunctions.filter_empty_or_null_objects,
        demovoc_keywords: FormatFunctions.filter_empty_or_null_objects,
        resources: FormatFunctions.filter_empty_or_null_objects,
        sources: FormatFunctions.filter_empty_or_null_objects,
        'dates.update': async () => +moment.utc(),
    },
    {
        subtitles: FormatFunctions.set_default_lang_for_array('lang', 'lang'),
        titles: FormatFunctions.set_default_lang_for_array('lang', 'lang'),
        abstracts: FormatFunctions.set_default_lang_for_array('lang', 'lang'),
        contributors: async result => result.reduce((arr, co) => {
            if (co.role == null) {
                co.role = 'author';
            }
            arr.push(co);
            return arr;
        }, []),
        files: async (result, object) => {
            if (!result) {
                return [];
            }


            const access = Utils.find_value_with_path(object, 'diffusion.rights.access'.split('.'));
            if (!access) {
                return result;
            }

            const access_description = await EntitiesUtils
                .retrieve_and_get_source('access_level', access);

            const myfiles = result.reduce((arr, file) => {
                if (!file) {
                    return arr;
                }

                file.access = {
                    restricted: access_description ? access_description.restricted : false,
                    confidential: access_description ? access_description.confidential : false,
                    delayed: access_description ? access_description.delayed : false,
                };

                arr.push(file);
                return arr;
            }, []);

            if (myfiles.length === 1) {
                myfiles[0].is_master = true;
            }
            return myfiles;
        },
        keywords: async (result, object) => {
            const keywords = result.map(k => ({ value: k.value, type: 'user' }));
            return keywords;
        },
        'dates.publication': async (result, object) => {
            if (object.model_mode) {
                return +moment.utc();
            }
            return result;
        },
        version: async (result, object) => {
            if (object.model_mode) {
                return 1;
            }
            return result;
        },
        status: async (result, object) => {
            if (object.model_mode) {
                return 'pending';
            }
            return result;
        },
    },
];

const Completion: Array<any> = [
    {
        authors: async (object) => {
            if (!object.contributors) {
                return [];
            }

            const potential_authors = object.contributors
                .filter(c => c.label && (c.role === 'author' || c.role == null));
            return { authors: potential_authors.map(pa => ({ _id: pa.label })) };
        },
        classifications: async () => ({ classifications: [] }),
        has_other_version: async () => ({ has_other_version: false }),
        depositor: (obj, path, info) => ({ depositor: info.papi ? info.papi._id : null }),
        reviewer: (obj, path, info) => {
            if (obj.review_mode) {
                return { reviewer: info.papi ? info.papi._id : null };
            }
            return {};
        },
    },
    {
        'dates.update': async () => ({ dates: { update: +moment.utc() } }),
        'denormalization.authors': ComplFunctions.denormalization('author', 'authors._id', 'fullname', false),
        'denormalization.book_authors': ComplFunctions.denormalization('author', 'book_authors._id', 'fullname', false),
    },
    {
        'denormalization.authors': ComplFunctions.denormalization('author', 'authors._id', '_id', false),
        'denormalization.book_authors': ComplFunctions.denormalization('author', 'book_authors._id', '_id', false),
    },
    {
        'denormalization.authors': ComplFunctions.denormalization('author', 'authors._id', 'firstname', false),
        'denormalization.book_authors': ComplFunctions.denormalization('author', 'book_authors._id', 'firstname', false),
    },
    {
        'denormalization.authors': ComplFunctions.denormalization('author', 'authors._id', 'lastname', false),
        'denormalization.book_authors': ComplFunctions.denormalization('author', 'book_authors._id', 'lastname', false),
    },
    {
        'denormalization.classifications': ComplFunctions.denormalization('subject', 'classifications._id', 'label', false),
    },
    {
        'denormalization.contributors': ComplFunctions.denormalization('author', 'contributors.label', 'fullname', false),
    },
    {
        'denormalization.contributors': ComplFunctions.denormalization('author', 'contributors.label', 'firstname', false),
    },
    {
        'denormalization.contributors': ComplFunctions.denormalization('author', 'contributors.label', 'lastname', false),
    },
    {
        'denormalization.contributors': ComplFunctions.denormalization('contributor_role', 'contributors.role', 'abbreviation', false, false, 'value'),
    },
    {
        'denormalization.contributors': ComplFunctions.denormalization('contributor_role', 'contributors.role', 'label', false, false, 'value'),
    },
    {
        'denormalization.diffusion.projects': ComplFunctions.denormalization('project', 'diffusion.projects._id', 'name', false),
    },
    {
        'denormalization.diffusion.anr_projects': ComplFunctions.denormalization('anr_project', 'diffusion.anr_projects._id', 'name', false),
    },
    {
        'denormalization.diffusion.european_projects': ComplFunctions.denormalization('european_project', 'diffusion.european_projects._id', 'name', false),
    },
    {
        'denormalization.diffusion.surveys': ComplFunctions.denormalization('survey', 'diffusion.surveys._id', 'name', false),
    },
    {
        'denormalization.diffusion.internal_collection': ComplFunctions.denormalization('internal_collection', 'diffusion.internal_collection', 'label', true),
    },
    {
        'denormalization.diffusion.research_teams': ComplFunctions.denormalization('laboratory', 'diffusion.research_teams._id', 'name', false),
    },
    {
        'denormalization.diffusion.rights.license': ComplFunctions.denormalization('license', 'diffusion.rights.license', 'label', true),
    },
    {
        'denormalization.diffusion.rights.access': ComplFunctions.denormalization('access_level', 'diffusion.rights.access', 'label', true),
    },
    {
        'denormalization.journal': ComplFunctions.denormalization('journal', 'journal', 'name', true),
    },
    {
        'denormalization.editor': ComplFunctions.denormalization('editor', 'editor', 'label', true),
    },
    {
        'denormalization.conference': ComplFunctions.denormalization('conference', 'conference', 'name', true),
    },
    {
        'denormalization.depositor.lastname': ComplFunctions.denormalization('user', 'depositor', 'lastname', false),
    },
    {
        'denormalization.reviewer.lastname': ComplFunctions.denormalization('user', 'reviewer', 'lastname', false),
    },
    {
        'denormalization.depositor.firstname': ComplFunctions.denormalization('user', 'depositor', 'firstname', false),
    },
    {
        'denormalization.reviewer.firstname': ComplFunctions.denormalization('user', 'reviewer', 'firstname', false),
    },
    {
        'denormalization.type.type': ComplFunctions.denormalization('typology', 'type', 'label', false),
    },
    {
        'denormalization.demovoc_keywords': ComplFunctions.denormalization('demovoc', 'demovoc_keywords._id', 'label', false),
    },
    {
        'denormalization.type.template': ComplFunctions.denormalization('typology', 'type', 'template', false),
    },
    {
        'denormalization.publication_version': ComplFunctions.denormalization('publication_version', 'publication_version', 'label', true),
    },
    {
        'denormalization.localisation.country': ComplFunctions.denormalization('country', 'localisation.country', 'label', true),
    },
    {
        parents: async (o, p, i) => {
            if ('parents' in o) {
                return { parents: o.parents };
            }
            return { parents: [] };
        },
    },
    {
        status: (o, p, i) => ComplFunctions.generic_complete('pending')(o, p, i),
        'dates.deposit': () => ({ dates: { deposit: +moment.utc() } }),
        'diffusion.rights.embargo': object => ({ diffusion: { rights: { embargo: Utils.find_value_with_path(object, 'dates.publication'.split('.')) || +moment.utc() } } }),
        'diffusion.rights.exports.nowhere': object => ({ diffusion: { rights: { exports: { nowhere: false } } } }),
    },
    {
        sherpa: async (object, path) => {
            if ('sherpa' in object) {
                return {};
            }

            const journal = Utils.find_value_with_path(object, 'journal'.split('.'));
            if (!journal) {
                return {};
            }

            const journal_source = await EntitiesUtils.retrieve_and_get_source('journal', journal);
            let issns = [];
            if (journal_source && 'ids' in journal_source) {
                issns = journal_source.ids.reduce((arr, i) => {
                    if (i.type === 'issn' || i.type === 'eissn') {
                        arr.push({ type: i.type, _id: i.value });
                    }
                    return arr;
                }, []);
            }

            if (issns.length === 0) {
                return {};
            }

            const issn = issns[0]._id;
            const sherpa_info = await Importers.import_sherpa_romeo({ request: { body: { issn } } });
            const conditions = Utils.find_value_with_path(sherpa_info, 'romeoapi.publishers.0.publisher.0.conditions.0.condition'.split('.'));
            const color = Utils.find_value_with_path(sherpa_info, 'romeoapi.publishers.0.publisher.0.romeocolour.0'.split('.'));
            const sherpa_final = {
                journal: journal_source.name,
            };
            if (conditions) {
                sherpa_final.conditions = conditions.map((c, i) =>
                    ({ label: XMLUtils.strip_xhtml_tags(c), value: i }));
            }
            if (color) {
                switch (color) {
                case 'blue':
                    sherpa_final.color = '#3273DC';
                    break;
                case 'green':
                    sherpa_final.color = '#23D161';
                    break;
                case 'yellow':
                    sherpa_final.color = '#544300';
                    break;
                default:
                case 'white':
                    sherpa_final.color = '#FFFFFF';
                    break;
                }
            }
            return { sherpa: sherpa_final };
        },
    },
];

const Resetting: Object = {
    denormalization: {},
    authors: [],
};

const Defaults: Object = {
    version: 1,
    abstracts: [],
    keywords: [],
    demovoc_keywords: [],
    subtitles: [],
    translated_titles: [],
    classifications: [],
    resources: [],
    dates: {},
    denormalization: {},
    authors: [],
    contributors: [],
    diffusion: {
        research_teams: [],
        projects: [],
        surveys: [],
        european_projects: [],
        anr_projects: [],
    },
    files: [],
    ids: [],
    parents: [],
    sources: [],
    system: {
        emails: [],
        api: {
            handle: false,
            hal: false,
        },
        stats: {
            views: 0,
            downloads: 0,
        },
    },
};

const Filtering: Array<string> = [];

const Messages: Object = {
    set: 'Publication is successfully added',
    remove: 'Publication is successfully removed',
    modify: 'Publication is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Pipelines: [PipelineTypeFiles, {
        Validation,
        Formatting,
        Filtering,
        Resetting,
        Completion,
        Defaults,
    }, {
        Validation,
        Formatting,
        Completion,
        Filtering,
        Resetting,
        Defaults,
    }, PipelineDiffusion, {
        Validation: [],
        Formatting: [{
            'system.emails': async (result, object, path, info) => {
                if (!('virtual_email' in object)) {
                    return result;
                }
                const obj = {
                    sent: false,
                    body: object.virtual_email,
                    created_at: +moment.utc(),
                    reviewer: info.papi ? info.papi._id : null,
                };
                result.push(obj);
                return result;
            } }],
        Completion: [],
        Filtering: [],
        Resetting: {},
        Defaults: {},
    }, {
        Validation: [],
        Formatting: [],
        Completion: [],
        Filtering: ['sherpa', 'parent', 'review_mode', 'model_mode', 'virtual_email'],
        Resetting: {},
        Defaults: {},
    }],
    Messages,
    Name: 'Publication',
};
