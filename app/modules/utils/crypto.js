// @flow
const moment = require('moment');
const Crypto = require('crypto');
const uuid = require('node-uuid');
const shortid = require('shortid');

function generate_key(login: string = ''): string {
    const key: string = uuid.v4() + shortid.generate() + login;
    return key;
}

function generate_secret(): string {
    const key: string = shortid.generate() + shortid.generate() + shortid.generate();
    const time: number = +moment();
    const hash: string = Crypto.createHmac('sha256', `${time}`).update(key).digest('hex');
    return hash;
}

module.exports = {
    generate_key,
    generate_secret,
};
