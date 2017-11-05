// @flow
const Joi = require('joi');
const TypologyMapping = require('../../../../mappings/typology');

const Mapping: Object = TypologyMapping.msw
    .mappings.typology.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Typology is successfully added',
    remove: 'Typology is successfully removed',
    modify: 'Typology is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Typology',
};
