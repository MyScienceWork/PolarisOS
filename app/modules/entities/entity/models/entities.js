// @flow
const Joi = require('joi');
const LRMapping = require('../../../../mappings/entity');

const Mapping: Object = LRMapping.msw
    .mappings.entity.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
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
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Entity',
};
