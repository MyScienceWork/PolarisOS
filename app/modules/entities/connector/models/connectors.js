// @flow
const Joi = require('joi');
const ConnectorMapping = require('../../../../mappings/connector');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = ConnectorMapping.msw.mappings.connector.properties;

const Validation: Array<any> = [
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {};

const Messages: Object = {
    set: 'Connector is successfully added',
    remove: 'Connector is successfully removed',
    modify: 'Connector is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Connector',
};
