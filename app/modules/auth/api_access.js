// @flow
module.exports = {};

const Errors = require('../exceptions/errors');
const Crypto = require('crypto');
const config = require('../../config');
const moment = require('moment');
const ODM = require('../entities/crud/odm');
const EntitiesUtils = require('../utils/entities');

async function _find_info(key: string): Promise<?ODM> {
    let info = await EntitiesUtils.search('apiuser', {
        where: {
            key,
        },
    });

    let hits = EntitiesUtils.get_hits(info);
    if (hits.length === 0) {
        info = await EntitiesUtils.search('user', {
            where: {
                'authentication.key': key,
            },
        });

        hits = EntitiesUtils.get_hits(info);
        if (hits.length === 0) {
            return null;
        }
    }
    return hits[0].source;
}

function api_signature(deactivated: boolean = false): Function {
    return async function func(ctx: Object, next: Function): Promise<*> {
        if (ctx.__md == null) {
            ctx.__md = {};
        }
        ctx.__md.lang = ctx.request.headers['x-md-lang'];

        const authorization: ? string = ctx.request.headers.authorization;
        if (authorization == null) {
            if (deactivated) {
                return await next();
            }
            throw Errors.NoAuthorizationHeaderError;
        }

        const two_part_auth: Array<string> = authorization.split(':');
        if (two_part_auth.length !== 2) {
            if (deactivated) {
                return await next();
            }
            throw new Errors.NoTwoPartAuthorizationError();
        }

        const api_key: string = two_part_auth[0];
        const sign: string = two_part_auth[1];
        const api_info = await _find_info(api_key);
        if (api_info == null) {
            if (deactivated) {
                return await next();
            }
            throw Errors.InvalidAPIKey;
        }

        ctx.__md.papi = api_info;

        if (deactivated) {
            return await next();
        }

        if (api_info.locked) {
            throw Errors.AccountIsLocked;
        }

        const timestamp = parseInt(ctx.request.headers['x-md-timestamp'], 10);
        const test_signature = `${ctx.request.method}${ctx.request.originalUrl}${ctx.request.headers['x-md-timestamp']}`;
        const hash = Crypto.createHmac('sha1', api_info.get('secret')).update(test_signature).digest('hex');

        if (hash !== sign) {
            throw Errors.InvalidSignature;
        }

        // Test timestamp
        const now = +moment();
        const legit_interval = [now - config.api.interval[0], now + config.api.interval[1]];
        const interval_is_okay = (timestamp >= api_info.get('timestamp')) ||
            (timestamp >= legit_interval[0] && timestamp <= legit_interval[1]);

        if (!interval_is_okay) {
            throw Errors.InvalidTimestamp;
        }

        api_info.set('timestamp', now);
        await api_info.update(api_info.db);
        return await next();
    };
}

module.exports.api_signature = api_signature;
