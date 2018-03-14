// @flow
const Joi = require('joi');
const ESMapping = require('../../../../mappings/function');
const MMapping = require('../../crud/mapping');
const ValFunctions = require('../../../pipeline/validator/valfunctions');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');

const Mapping: Object = ESMapping.msw
    .mappings.function.properties;

const Validation: Array<any> = [
    Joi.object({
        type: Joi.any().valid(['completer', 'formatter']).label('Type'),
        name: Joi.string().required().label('Name'),
    }),
];

const Formatting: Array<any> = [
    {
        arguments: a => FormatFunctions.oarray_to_array(a),
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Function is successfully added',
    remove: 'Function is successfully removed',
    modify: 'Function is successfully modified',
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
    Name: 'Function',
};
