// @flow
const _ = require('lodash');
const Joi = require('joi');
const LangMapping = require('../../../../mappings/lang');

const Mapping: Object = LangMapping.msw
    .mappings.lang.properties;

const Validation: Array<any> = [
    Joi.object({
        key: Joi.string().required().label('Key'),
        part: Joi.string().required().label('Part'),
        values: Joi.array().min(1).items(Joi.any().required()).label('Text/Quantity'),
    }),
];

const Formatting: Array<any> = [
    {
        values: async (values) => {
            if (values instanceof Array) {
                return values.filter(v => v != null && Object.keys(v).length > 0);
            }
            if (values instanceof Object) {
                return _.filter(values, val => val != null && Object.keys(val).length > 0);
            }
            return [];
        },
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Lang element is successfully added',
    remove: 'Lang element is successfully removed',
    modify: 'Lang element is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Lang element',
};
