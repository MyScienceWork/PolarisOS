// @flow
const Joi = require('joi');
const LRMapping = require('../../../../mappings/pipeline');

const Mapping: Object = LRMapping.msw
    .mappings.pipeline.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
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
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Pipeline',
};
