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
    }),
    ValFunctions.checks.is_unique('type', 'entity'),
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
