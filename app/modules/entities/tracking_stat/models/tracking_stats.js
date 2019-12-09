// @flow
const moment = require('moment');
const Joi = require('joi');
const Crypto = require('crypto');
const TSMapping = require('../../../../mappings/tracking_stat');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = TSMapping.msw.mappings.properties;

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
    set: 'Tracking Stats is successfully added',
    remove: 'Tracking Stats is successfully removed',
    modify: 'Tracking Stats is successfully modified',
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
    Name: 'TrackingStats',
};
