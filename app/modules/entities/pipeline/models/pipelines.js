// @flow
const Joi = require('joi');
const LRMapping = require('../../../../mappings/pipeline');
const MMapping = require('../../crud/mapping');
const ValFunctions = require('../../../pipeline/validator/valfunctions');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');

const Mapping: Object = LRMapping.msw
    .mappings.pipeline.properties;

const Validation: Array<any> = [
    Joi.object({
        entity: Joi.string().required().label('Entity pipeline'),
    }),
    ValFunctions.checks.is_unique('entity', 'pipeline'),
];

const Formatting: Array<any> = [
    {
        formatters: a => FormatFunctions.oarray_to_array(a),
        completers: a => FormatFunctions.oarray_to_array(a),
        transformers: a => FormatFunctions.oarray_to_array(a),
        validators: a => FormatFunctions.oarray_to_array(a),
        defaults: a => FormatFunctions.oarray_to_array(a),
    },

];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Pipeline is successfully added',
    remove: 'Pipeline is successfully removed',
    modify: 'Pipeline is successfully modified',
};

module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Pipeline',
};
