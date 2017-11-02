// @flow
const Joi = require('joi');
const DTMapping = require('../../../../mappings/datatemplate');

const Mapping: Object = DTMapping.msw
    .mappings.datatemplate.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Data template is successfully added',
    remove: 'Data template is successfully removed',
    modify: 'Data template is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Data template',
};
