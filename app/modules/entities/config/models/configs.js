// @flow
const Joi = require('joi');
const ConfigMapping = require('../../../../mappings/config');

const Mapping: Object = ConfigMapping.msw
    .mappings.config.properties;

const Validation: Array<any> = [
    Joi.object({
        environment: Joi.any().valid(['local', 'production', 'development', 'demo']).label('Environment'),
    }),
];

const Formatting: Array<any> = [];

const Completion: Array<any> = [];

const Messages: Object = {
    set: 'Config is successfully added',
    remove: 'Config is successfully removed',
    modify: 'Config is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Name: 'Config',
};
