// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const WidgetMapping = require('../../../../mappings/widget');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = WidgetMapping.msw.mappings.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [
    {
        texts: a => FormatFunctions.oarray_to_array(a),
        variables: a => FormatFunctions.oarray_to_array(a),
        events: a => FormatFunctions.oarray_to_array(a),
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {
};

const Messages: Object = {
    set: 'Widget is successfully added',
    remove: 'Widget is successfully removed',
    modify: 'Widget is successfully modified',
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
    Name: 'Widget',
};
