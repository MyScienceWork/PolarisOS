// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const TemplateMapping = require('../../../../mappings/template');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = TemplateMapping.msw.mappings.template.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [];

const Completion: Array<any> = [];

const Defaults: Object = {
};

const Messages: Object = {
    set: 'Template is successfully added',
    remove: 'Template is successfully removed',
    modify: 'Template is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'Template',
};
