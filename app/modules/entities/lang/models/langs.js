// @flow
const _ = require('lodash');
const Joi = require('joi');
const LangMapping = require('../../../../mappings/lang');
const MMapping = require('../../crud/mapping');

const Mapping: Object = LangMapping.msw
    .mappings.lang.properties;

const Validation: Array<any> = [
    Joi.object({
        key: Joi.string().required().label('Key'),
        values: Joi.array().min(1).items(Joi.any().required()).label('Text/Quantity'),
        parts: Joi.array().min(1).items(Joi.any().required()).label('Parts'),
    }),
];

const Formatting: Array<any> = [
    {
        key: async key => key.trim(),
        values: async (values) => {
            if (values instanceof Array) {
                return values.filter(v => v != null && Object.keys(v).length > 0);
            }
            if (values instanceof Object) {
                return _.filter(values, val => val != null && Object.keys(val).length > 0);
            }
            return [];
        },
        parts: async (parts) => {
            if (parts == null) {
                return [];
            }
            if (parts instanceof Array) {
                return parts.filter(p => p != null && p !== '').map((p) => {
                    if (typeof p === 'string') {
                        return { value: p };
                    }
                    return p;
                });
            } else if (parts instanceof Object) {
                return _.filter(parts, val => val != null && Object.keys(val).length > 0).map((p) => {
                    if (typeof p === 'string') {
                        return { value: p };
                    }
                    return p;
                });
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
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Lang element',
};
