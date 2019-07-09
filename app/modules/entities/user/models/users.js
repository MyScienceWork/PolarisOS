// @flow
const Joi = require('joi');
const Crypto = require('crypto');
const UserMapping = require('../../../../mappings/user');
const MMapping = require('../../crud/mapping');
const FormatFunctions = require('../../../pipeline/formatter/formatfunctions');
const ComplFunctions = require('../../../pipeline/completer/complfunctions');
const ValFunctions = require('../../../pipeline/validator/valfunctions');
const Utils = require('../../../utils/utils');
const Config = require('../../../../config');

const Mapping: Object = UserMapping.msw.mappings.user.properties;

const Validation: Array<any> = [
    Joi.object().keys({
        firstname: Joi.string().required().label('Firstname'),
        lastname: Joi.string().required().label('Lastname'),
        fullname: Joi.string().required().label('Fullname'),
        preferred_language: Joi.string(),
        hpassword: Joi.string().label('Password'),
        retype_hpassword: Joi.string().valid(Joi.ref('hpassword')).label('Password validation'),
        emails: Joi.array().items(
            Joi.object().keys({
                email: Joi.string().required().label('Email'),
            }),
        ).min(1).required().label('Email'),
    }),
    //ValFunctions.checks.is_unique('uid', 'user'),
];

const Formatting: Array<any> = [
    {
        emails: a => FormatFunctions.oarray_to_array(a),
        roles: a => FormatFunctions.oarray_to_array(a),
        identifiers: a => FormatFunctions.oarray_to_array(a),
        password: async (result, object) => {
            const hpassword = Utils.find_value_with_path(object, 'hpassword'.split('.'));
            if (!hpassword) {
                return result;
            }

            const sha_hpassword = Crypto.createHash('sha1').update(hpassword).digest('hex');
            return sha_hpassword;
        },
        iid: async (result, object) => {
            const sha_iid = Crypto.createHash('sha1').update(result).digest('hex');
            object.iid_hashed = sha_iid;
            return result;
        },
    },
];

const Completion: Array<any> = [{
    'authentication.key': (o, i, p) => ComplFunctions.key_complete(o, i, p),
    'authentication.secret': (o, i, p) => ComplFunctions.secret_complete(o, i, p),
    fullname: ComplFunctions.generic_complete('{{object.firstname}} {{object.lastname}}'),
    password: async (o) => {
        const hpassword = Utils.find_value_with_path(o, 'hpassword'.split('.'));
        if (!hpassword) {
            const dpassword = Config.auth.default_password;
            const sha_dpassword = Crypto.createHash('sha1').update(dpassword).digest('hex');
            return { password: sha_dpassword };
        }

        const sha_hpassword = Crypto.createHash('sha1').update(hpassword).digest('hex');
        return { password: sha_hpassword };
    },
}];

const Defaults: Object = {
    locked: false,
    enabled: true,
    force_deconnection: true,
    authentication: {},
};

const Resetting: Object = {
    fullname: undefined,
};

const Filtering: Array<string> = ['hpassword', 'retype_hpassword'];

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
        Filtering,
        Resetting,
        Completion,
        Defaults,
    }],
    Messages,
    Name: 'User',
};
