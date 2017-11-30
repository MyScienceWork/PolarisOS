// @flow
const Joi = require('joi');
const DIMapping = require('../../../../mappings/datainstance');

const Mapping: Object = DIMapping.msw
    .mappings.datainstance.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
];

const Formatting: Array<any> = [];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Datainstance is successfully added',
    remove: 'Datainstance is successfully removed',
    modify: 'Datainstance is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Data Instance',
};
