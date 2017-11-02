// @flow
const _ = require('lodash');
const Joi = require('joi');
const FormMapping = require('../../../../mappings/form');

const Mapping: Object = FormMapping.msw
    .mappings.form.properties;

const Validation: Array<any> = [
    Joi.object({
    }),
];

const Formatting: Array<any> = [
    {
        fields: async (fields) => {
            if (fields instanceof Array) {
                return fields.filter(v => v != null && Object.keys(v).length > 0);
            }
            if (fields instanceof Object) {
                return _.filter(fields, val => val != null && Object.keys(val).length > 0);
            }
            return [];
        },
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Form is successfully added',
    remove: 'Form is successfully removed',
    modify: 'Form is successfully modified',
};

module.exports = {
    Mapping,
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Form',
};
