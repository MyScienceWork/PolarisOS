// @flow
const Joi = require('joi');
const LRMapping = require('../../../../mappings/pipeline');
const MMapping = require('../../crud/mapping');
const ValFunctions = require('../../../pipeline/validator/valfunctions');

const Mapping: Object = LRMapping.msw
    .mappings.pipeline.properties;

const Validation: Array<any> = [
    Joi.object({
        entity: Joi.string().required().label('Entity pipeline'),
    }),
    ValFunctions.checks.is_unique('entity', 'pipeline'),
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Pipeline is successfully added',
    remove: 'Pipeline is successfully removed',
    modify: 'Pipeline is successfully modified',
};

module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Pipeline',
};
