// @flow
const Joi = require('joi');
const KSMapping = require('../../../../mappings/keystore');

const Mapping: Object = KSMapping.msw
    .mappings.keystore.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Key-Value is successfully added',
    remove: 'Key-Value is successfully removed',
    modify: 'Key-Value is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Key-Value',
};
