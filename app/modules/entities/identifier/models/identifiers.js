// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const IdentifierMapping = require('../../../../mappings/identifier');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = IdentifierMapping.msw.mappings.identifier.properties;

const Validation: Array<any> = [
    // Joi.object({
    //     css: Joi.string().required().label('CSS'),
    //     name: Joi.string().required().label('Name'),
    // }),
];

const Formatting: Array<any> = [];

const Completion: Array<any> = [];

const Defaults: Object = {
};

const Messages: Object = {
    set: 'User identifier is successfully added',
    remove: 'User identifier is successfully removed',
    modify: 'User identifier is successfully modified',
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
    Name: 'Identifier',
};
