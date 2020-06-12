// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const MenuMapping = require('../../../../mappings/menu');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = MenuMapping.msw.mappings.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [
    {
        elements: a => FormatFunctions.oarray_to_array(a),
    },
    {
        'elements.submenus': a => FormatFunctions.oarray_to_array(a),
    },
];

const Completion: Array<any> = [];

const Defaults: Object = {
};

const Messages: Object = {
    set: 'Menu is successfully added',
    remove: 'Menu is successfully removed',
    modify: 'Menu is successfully modified',
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
    Name: 'Menu',
};
