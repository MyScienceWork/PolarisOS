// @flow
const Joi = require('joi');
const LRMapping = require('../../../../mappings/langref');

const Mapping: Object = LRMapping.msw
    .mappings.langref.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Lang is successfully added',
    remove: 'Lang is successfully removed',
    modify: 'Lang is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Lang Ref',
};
