// @flow
const Joi = require('joi');
const LRMapping = require('../../../../mappings/datasource');

const Mapping: Object = LRMapping.msw
    .mappings.datasource.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Datasource is successfully added',
    remove: 'Datasource is successfully removed',
    modify: 'Datasource is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Data source',
};
