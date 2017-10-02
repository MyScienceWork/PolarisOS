// @flow
const mongoose = require('mongoose');
const Joi = require('joi');
const Crypto = require('crypto');
const AccessSchema = require('../../../auth/access_schema');
const CryptoUtils = require('../../../utils/crypto');

const Schema = mongoose.Schema;

const MySchema: mongoose.Schema = new Schema({
    key: { type: String, index: true, default: CryptoUtils.generate_key },
    secret: { type: String, default: CryptoUtils.generate_secret },
    email: { type: String, index: true },
    firstname: { type: String },
    lastname: { type: String, index: true },
    hpassword: { type: String },
    salt: { type: String },
    access: AccessSchema,
});

MySchema.methods = {
    authenticate(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    makeSalt() {
        return `${Math.round((new Date().valueOf() * Math.random()))}`;
    },

    encryptPassword(password) {
        if (!password) return '';
        let encrypred;
        try {
            encrypred = Crypto.createHmac('sha256', this.salt).update(password).digest('hex');
            return encrypred;
        } catch (err) {
            return '';
        }
    },
};

MySchema
.virtual('password')
.set((password) => {
    this._password = password;
    if (password && password.length) {
        this.salt = this.makeSalt();
        this.hpassword = this.encryptPassword(password);
    } else {
        this.hpassword = '';
    }
})
.get(() => this._password);


const Validation: Array<any> = [
    Joi.object().keys({
        email: Joi.string().email().label('Email address'),
        password: Joi.string().label('Password'),
    }),
];

const Formatting: Array<any> = [];

const Completion: Array<any> = [];

const Messages: Object = {
    set: 'User is successfully added',
    remove: 'User is successfully removed',
    modify: 'User is successfully modified',
};

const Model: mongoose.Model = mongoose.model('User', MySchema);

module.exports = {
    Model,
    Validation,
    Formatting,
    Completion,
    Messages,
    Name: 'User',
};
