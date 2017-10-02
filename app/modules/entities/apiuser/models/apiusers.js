// @flow
const mongoose = require('mongoose');
const Joi = require('joi');
const AccessSchema = require('../../../auth/access_schema');
const CryptoUtils = require('../../../utils/crypto');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const MySchema: mongoose.Schema = new Schema({
    name: { type: String, index: true },
    key: { type: String, default: CryptoUtils.generate_key, index: true },
    secret: { type: String, default: CryptoUtils.generate_secret },
    timestamp: { type: Number, default: 0 },
    locked: { type: Boolean, default: false },
    testing: { type: Boolean, default: true },
    fairuse: {
        sms: { type: Number, default: 10 },
        email: { type: Number, default: 30 },
        max_hits: { type: Number, default: 420 },
    },
    hits: { type: Number, default: 0 },
    urls: {
        next: { type: String },
    },
    access: AccessSchema,
});

const Validation: Array<any> = [
    Joi.object().keys({
        name: Joi.string().required().label('Api username'),
    }),
    {
        urls: Joi.object().keys({
            next: Joi.string().allow('').uri().label('Notification URL'),
        }),
    },
];

const Formatting: Array<any> = [];

const Completion: Array<any> = [];

const Messages: Object = {
    set: 'API user is successfully added',
    remove: 'API user is successfully removed',
    modify: 'API user is successfully modified',
};

const Model: mongoose.Model = mongoose.model('ApiUser', MySchema);

module.exports = {
    Model,
    Validation,
    Formatting,
    Completion,
    Messages,
    Name: 'ApiUser',
};
