// @flow
const Joi = require('joi');
const ConfigMapping = require('../../../../mappings/config');

const Mapping: Object = ConfigMapping.msw
    .mappings.config.properties;

const Validation: Array<any> = [
    Joi.object({
        environment: Joi.any().valid(['local', 'production', 'development', 'demo']).label('Environment'),
        langs: Joi.array().min(1).items(Joi.any().required()).label('Lang'),
    }),
];

const Formatting: Array<any> = [
    {
        langs: async langs => langs
           .filter(lang => lang != null && lang.trim() !== '')
           .map(lang => ({ value: lang })),
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {};

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
    Defaults,
    Name: 'Config',
};
