// @flow
const _ = require('lodash');
const Joi = require('joi');
const TypologyMapping = require('../../../../mappings/typology');

const Mapping: Object = TypologyMapping.msw
    .mappings.typology.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
];

const Formatting: Array<any> = [
    {
        children: async (children) => {
            let new_fields = [];
            if (children instanceof Array) {
                new_fields = children.filter(v => v != null && Object.keys(v).length > 0);
            }
            if (children instanceof Object) {
                new_fields = _.filter(children, val => val != null && Object.keys(val).length > 0);
            }
            return new_fields;
        },
    },
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
