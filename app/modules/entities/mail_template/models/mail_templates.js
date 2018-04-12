// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const MailTemplateMapping = require('../../../../mappings/mail_template');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = MailTemplateMapping.msw.mappings.menu.properties;

const Validation: Array<any> = [];

const Formatting: Array<any> = [
];

const Completion: Array<any> = [];

const Defaults: Object = {
};

const Messages: Object = {
    set: 'Mail template is successfully added',
    remove: 'Mail template is successfully removed',
    modify: 'Mail template is successfully modified',
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
    Name: 'MailTemplate',
};
