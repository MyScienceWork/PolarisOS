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
            let new_fields = [];
            if (fields instanceof Array) {
                new_fields = fields.filter(v => v != null && Object.keys(v).length > 0);
            }
            if (fields instanceof Object) {
                new_fields = _.filter(fields, val => val != null && Object.keys(val).length > 0);
            }
            new_fields.sort((a, b) => a.order - b.order);
            return new_fields;
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
