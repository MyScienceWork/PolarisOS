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
        resources: a => FormatFunctions.oarray_to_array(a),
        sources: a => FormatFunctions.oarray_to_array(a),
        subtitles: a => FormatFunctions.oarray_to_array(a),
        translated_titles: a => FormatFunctions.oarray_to_array(a),
        parents: async (result, object) => {
            if ('parent' in object) {
                result.push({ _id: object.parent });
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
        dkeywords: FormatFunctions.filter_empty_or_null_objects,
        resources: FormatFunctions.filter_empty_or_null_objects,
        sources: FormatFunctions.filter_empty_or_null_objects,
        'dates.update': async () => +moment(),
    },
    {
        subtitles: FormatFunctions.set_default_lang_for_array('lang', 'lang'),
        titles: FormatFunctions.set_default_lang_for_array('lang', 'lang'),
        abstracts: FormatFunctions.set_default_lang_for_array('lang', 'lang'),
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

            const files = result.reduce((arr, file) => {
                if (!file) {
                    return arr;
                }

                file.access = {
                    restricted: access_description ? access_description.restricted : false,
                    delayed: access_description ? access_description.delayed : false,
                };

                arr.push(file);
                return arr;
            }, []);

            if (files.length === 1) {
                files[0].is_master = true;
            }
            return files;
        },
        keywords: async (result, object) => {
            const demovoc = object.dkeywords || [];
            const keywords = result.map(k => ({ value: k.value, type: 'user' }));
            // TODO Change ._id when final Demovoc
            const dkeywords = demovoc.map(k => ({ value: k._id, type: 'demovoc' }));
            return [...keywords, ...dkeywords];
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
    },
    {
        'dates.update': async () => ({ dates: { update: +moment() } }),
        'denormalization.authors': ComplFunctions.denormalization('author', 'authors._id', 'fullname', false),
    },
    {
        'denormalization.authors': ComplFunctions.denormalization('author', 'authors._id', '_id', false),
    },
    {
        'denormalization.classifications': ComplFunctions.denormalization('subject', 'classifications._id', 'label', false),
    },
    {
        'denormalization.contributors': ComplFunctions.denormalization('author', 'contributors.label', 'fullname', false),
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
        'denormalization.type.template': ComplFunctions.denormalization('typology', 'type', 'template', false),
    },
    {
        'denormalization.publication_version': ComplFunctions.denormalization('publication_version', 'publication_version', 'label', true),
    },
    {
        'denormalization.localisation.country': ComplFunctions.denormalization('country', 'localisation.country', 'label', true),
    },
    {
        parents: (o, p, i) => {
            if ('parents' in o) {
                return { parents: o.parents };
            }
            return { parents: [] };
        },
    },
    {
        status: (o, p, i) => ComplFunctions.generic_complete('pending')(o, p, i),
        'dates.deposit': () => ({ dates: { deposit: +moment() } }),
        depositor: (obj, path, info) => ({ depositor: info.papi ? info.papi._id : null }),
        reviewer: (obj, path, info) => {
            if (obj.review_mode) {
                return { reviewer: info.papi ? info.papi._id : null };
            }
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
};

const Filtering: Array<string> = ['parent', 'dkeywords', 'review_mode'];

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
    }, PipelineDiffusion],
    Messages,
    Name: 'Publication',
};
