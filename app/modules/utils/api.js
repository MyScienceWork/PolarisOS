// @flow
const Crypto = require('crypto');
const URL = require('url').URL;
const moment = require('moment');

function generate_signature(method: string, url: string, secret: string): [string, number] {
    const timestamp = +moment();
    const endpoint = new URL(url).pathname;
    const concat = `${method}/${endpoint}${timestamp}`;
    const sign = Crypto.createHmac('sha1', secret).update(concat).digest('hex');
    return [sign, timestamp];
}

module.exports = {
    generate_signature,
};
