// @flow
const Joi = require('joi');
const ImporterMapping = require('../../../../mappings/importer');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = ImporterMapping.msw.mappings.importer.properties;

const Validation: Array<any> = [
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Importer is successfully added',
    remove: 'Importer is successfully removed',
    modify: 'Importer is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Importer',
};
