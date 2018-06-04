// @flow
const Joi = require('joi');
const QMapping = require('../../../../mappings/query');
const MMapping = require('../../crud/mapping');
const ValFunctions = require('../../../pipeline/validator/valfunctions');

const Mapping: Object = QMapping.msw.mappings.query.properties;

const Validation: Array<any> = [
    Joi.object({
        name: Joi.string().required().label('Name'),
        id: Joi.string().required().label('ID'),
    }),
    ValFunctions.checks.is_valid_json('content'),
    ValFunctions.checks.is_unique('id', 'query'),
];

const Formatting: Array<any> = [];

const Completion: Array<any> = [];

const Defaults: Object = {
};

const Messages: Object = {
    set: 'Query is successfully added',
    remove: 'Query is successfully removed',
    modify: 'Query is successfully modified',
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
    Name: 'query',
};
