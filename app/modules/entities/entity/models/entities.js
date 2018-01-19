// @flow
const Joi = require('joi');
const LRMapping = require('../../../../mappings/entity');
const MMapping = require('../../crud/mapping');
const ValFunctions = require('../../../pipeline/validator/valfunctions');

const Mapping: Object = LRMapping.msw
    .mappings.entity.properties;

const Validation: Array<any> = [
    Joi.object({
        type: Joi.string().required().label('Entity type'),
        mapping: Joi.string().required().label('Mapping'),
        pipeline: Joi.string().required().label('Pipeline'),
    }),
    ValFunctions.checks.is_unique('type', 'entity'),
    ValFunctions.checks.if_exists('form', 'form'),
    ValFunctions.checks.if_exists('pipeline', 'pipeline'),
    ValFunctions.checks.is_valid_json('mapping'),
];

const Formatting: Array<any> = [
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
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Entity',
};
