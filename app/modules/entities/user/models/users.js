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
        firstname: Joi.string().required().label('Firstname'),
        lastname: Joi.string().required().label('Lastname'),
        fullname: Joi.string().required().label('Fullname'),
    }),
];

const Formatting: Array<any> = [
    {
        emails: a => FormatFunctions.oarray_to_array(a),
        roles: a => FormatFunctions.oarray_to_array(a),
        password: a => Crypto.createHash('sha1').update(a).digest('hex'),
    },
];

const Completion: Array<any> = [{
    'authentication.key': (o, i, p) => ComplFunctions.key_complete(o, i, p),
    'authentication.secret': (o, i, p) => ComplFunctions.secret_complete(o, i, p),
    fullname: ComplFunctions.generic_complete('{{object.firstname}} {{object.lastname}}'),
}];

const Defaults: Object = {
    locked: false,
    enabled: true,
    force_deconnection: true,
};

const Resetting: Object = {
    fullname: undefined,
};

const Messages: Object = {
    set: 'User is successfully added',
    remove: 'User is successfully removed',
    modify: 'User is successfully modified',
};


module.exports = {
    RawMapping: Mapping,
    Mapping: new MMapping(Mapping),
    Pipelines: [{
        Validation,
        Formatting,
        Resetting,
        Completion,
        Defaults,
    }],
    Messages,
    Name: 'User',
};
