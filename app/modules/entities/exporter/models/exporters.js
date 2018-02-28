// @flow
const Joi = require('joi');
const ExporterMapping = require('../../../../mappings/exporter');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = ExporterMapping.msw.mappings.exporter.properties;

const Validation: Array<any> = [
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Exporter is successfully added',
    remove: 'Exporter is successfully removed',
    modify: 'Exporter is successfully modified',
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
    Name: 'Exporter',
};
