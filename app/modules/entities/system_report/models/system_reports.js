// @flow
const moment = require('moment');
const Joi = require('@hapi/joi');
const Crypto = require('crypto');
const SRMapping = require('../../../../mappings/system_report');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = SRMapping.msw.mappings.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [
    {
    },
    {
    },
];

const Completion: Array<any> = [{
}];

const Defaults: Object = {
    date: +moment.utc(),
};

const Messages: Object = {
    set: 'Report is successfully added',
    remove: 'Report is successfully removed',
    modify: 'Report is successfully modified',
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
    Name: 'SystemReports',
};
