// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const PageMapping = require('../../../../mappings/page');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = PageMapping.msw.mappings.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [
    {
        rows: a => FormatFunctions.oarray_to_array(a),
    },
    {
        'rows.widget.variables': a => FormatFunctions.oarray_to_array(a),
        'rows.widget.texts': a => FormatFunctions.oarray_to_array(a),
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {
    global_access: {},
};

const Messages: Object = {
    set: 'Page is successfully added',
    remove: 'Page is successfully removed',
    modify: 'Page is successfully modified',
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
    Name: 'Page',
};
