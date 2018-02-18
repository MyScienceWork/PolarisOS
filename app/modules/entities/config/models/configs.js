// @flow
const Joi = require('joi');
const ConfigMapping = require('../../../../mappings/config');
const MMapping = require('../../crud/mapping');

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
            .map((lang) => {
                if (lang == null) {
                    return null;
                }

                if (typeof lang === 'string' && lang.trim() !== '') {
                    return lang;
                }

                const val = lang.value;
                if (val && val.trim() !== '') {
                    return val.trim();
                }
                return null;
            })
            .filter(lang => lang != null)
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
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Config',
};
