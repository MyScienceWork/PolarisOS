// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const UserMapping = require('../../../../mappings/user');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');

const Mapping: Object = UserMapping.msw.mappings.user.properties;

const Validation: Array<any> = [
    Joi.object().keys({
        email: Joi.string().required().email().label('Email address'),
        password: Joi.string().required().label('Password'),
        retype_password: Joi.string().required().valid(Joi.ref('password')).label('Password').options({
            language: {
                any: {
                    allowOnly: '!!Passwords do not match',
                },
            },
        }),
        firstname: Joi.string().required().label('Firstname'),
        lastname: Joi.string().required().label('Lastname'),
    }),
];

const Formatting: Array<any> = [
    {
        emails: a => FormatFunctions.oarray_to_array(a),
    },
];

const Completion: Array<any> = [{
    'authentication.key': (o, i, p) => ComplFunctions.key_complete(o, i, p),
    'authentication.secret': (o, i, p) => ComplFunctions.secret_complete(o, i, p),
}];

const Defaults: Object = {};

const Messages: Object = {
    set: 'User is successfully added',
    remove: 'User is successfully removed',
    modify: 'User is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Validation,
    Formatting,
    Completion,
    Messages,
    Defaults,
    Name: 'User',
};
