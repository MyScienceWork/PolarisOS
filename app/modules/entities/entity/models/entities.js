// @flow
const Joi = require('joi');
const LRMapping = require('../../../../mappings/entity');
const MMapping = require('../../crud/mapping');
const ValFunctions = require('../../../pipeline/validator/valfunctions');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');

const Mapping: Object = LRMapping.msw
    .mappings.properties;

const Validation: Array<any> = [
    Joi.object({
        type: Joi.string().required().label('Entity type'),
        mapping: Joi.string().required().label('Mapping'),
        pipelines: Joi.array().min(1).required().items(Joi.any().required()).label('Pipelines'),
    }),
    ValFunctions.checks.is_unique('type', 'entity'),
    ValFunctions.checks.if_exists('form', 'form'),
    ValFunctions.checks.if_exists('pipelines._id', 'pipeline', true),
    ValFunctions.checks.is_valid_json('mapping'),
];

const Formatting: Array<any> = [
    {
        'backoffice.columns': FormatFunctions.oarray_to_array,
    },
    {
        'backoffice.columns': FormatFunctions.filter_empty_or_null_objects,
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Entity is successfully added',
    remove: 'Entity is successfully removed',
    modify: 'Entity is successfully modified',
};

module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Pipelines: [{
        Validation,
        Formatting,
        Completion,
        Defaults,
    }],
    Messages,
    Name: 'Entity',
};
