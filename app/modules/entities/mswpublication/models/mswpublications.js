// @flow
const Joi = require('joi');
const PubMapping = require('../../../../mappings/mswpublication');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');
const EntitiesUtils = require('../../../utils/entities');
const Utils = require('../../../utils/utils');


const Mapping: Object = PubMapping.msw.mappings.mswpublication.properties;

const Validation: Array<any> = [
];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [
];

const Resetting: Object = {
};

const Defaults: Object = {
};

const Filtering: Array<string> = [];

const Messages: Object = {
    set: 'Publication is successfully added',
    remove: 'Publication is successfully removed',
    modify: 'Publication is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Pipelines: [{
        Validation,
        Formatting,
        Filtering,
        Resetting,
        Completion,
        Defaults,
    }],
    Messages,
    Name: 'MSWPublication',
};
