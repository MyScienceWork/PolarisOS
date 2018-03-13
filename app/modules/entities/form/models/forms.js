// @flow
const _ = require('lodash');
const Joi = require('joi');
const FormMapping = require('../../../../mappings/form');
const MMapping = require('../../crud/mapping');
const Handlebars = require('../../../utils/templating');
const Utils = require('../../../utils/utils');
const ValFunctions = require('../../../pipeline/validator/valfunctions');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');

const Mapping: Object = FormMapping.msw
.mappings.form.properties;

const fieldsSchema = Joi.object({
    type: Joi.string().required().label('Type'),
    name: Joi.string().required().label('Name'),
    order: Joi.number().required().min(1).label('Order'),
});

const Validation: Array<any> = [
    Joi.object({
        name: Joi.string().required().label('Name'),
        label: Joi.string().required().label('Label'),
        fields: Joi.array().min(1).items(fieldsSchema).required().label('Fields'),
    }),
    ValFunctions.checks.is_unique('name', 'form', []),
];

const Formatting: Array<any> = [
    {
        fields: a => FormatFunctions.oarray_to_array(a),
    },
    {
        fields: FormatFunctions.filter_empty_or_null_objects,
    },
    {
        fields: async fields => fields.sort((a, b) => a.order - b.order),
    },
    {
        'fields.range.start': async start => parseInt(Handlebars.compile(start)({})),
        'fields.range.end': async end => parseInt(Handlebars.compile(end)({})),
        'fields.range.step': async step => parseInt(Handlebars.compile(step)({})),
        has_subforms: async (has, object) => object.fields.some(f => f.subform && f.subform !== ''),
    },
];

const Completion: Array<any> = [
    {
        // 'fields.range.step': async () => ({ step: 1 }),
    },
];

const Defaults: Object = {
    has_subforms: false,
};

const Messages: Object = {
    set: 'Form is successfully added',
    remove: 'Form is successfully removed',
    modify: 'Form is successfully modified',
};

module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Pipelines: [{
        Validation,
        Formatting,
        Completion,
        Defaults,
    }],
    Messages,
    Name: 'Form',
};
