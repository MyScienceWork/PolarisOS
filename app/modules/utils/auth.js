// @flow
const CAS = require('cas');
const Crypto = require('crypto');
const Config = require('../../config');
const Logger = require('../../logger');
const EntitiesUtils = require('./entities');
const LangUtils = require('./lang');
const Utils = require('./utils');
const Errors = require('../exceptions/errors');

async function find_user(info: string, field: string = 'emails.email'): Promise<?Object> {
    const sources = await EntitiesUtils.search_and_get_sources('user', {
        where: {
            [field]: info,
        },
        size: 1,
        population: ['roles._id'],
    });

    if (sources.length === 0) {
        return null;
    }
    return sources[0];
}

function do_standard_checks(user: Object): boolean {
    if (user.locked) {
        throw Errors.AccountIsLocked;
    }

    return true;
}


async function login_auth(email: string, password: string): Promise<Object> {
    const db = await find_user(email, 'emails.email');
    if (!db) {
        return { ok: false, user: {} };
    }

    do_standard_checks(db);

    const hpassword = Crypto.createHash('sha1').update(password).digest('hex');
    if (hpassword === db.password) {
        return { ok: true,
            user: db };
    }

    return { ok: false, user: {} };
}

async function get_cas_info(): Promise<?Object> {
    const global_config = await LangUtils.get_config(Config._env);

    if (!global_config) {
        Logger.error('No config found in ES...');
        return null;
    }

    const use_cas_sso = Utils.find_value_with_path(global_config,
        'authentication.use_cas_sso'.split('.'));

    const use_ldap = Utils.find_value_with_path(global_config,
        'authentication.use_ldap'.split('.'));

    if (!use_cas_sso) {
        Logger.error('CAS-SSO is not configured');
        return null;
    }

    const base = Utils.find_value_with_path(global_config, 'authentication.cas_sso.base'.split('.'));
    const service = Utils.find_value_with_path(global_config, 'authentication.cas_sso.service'.split('.'));

    if (!base || !service) {
        Logger.error('CAS-SSO is not correctly configured');
        return null;
    }

    return { base, service, use_cas_sso, use_ldap };
}

async function cas_auth(ticket: string, redirect: string): Promise<Object> {
    const cas_info = await get_cas_info();
    if (!cas_info) {
        return { ok: false, user: {} };
    }

    const obj = {
        base_url: cas_info.base,
        service: cas_info.service,
        version: 2.0,
    };

    console.log(ticket, redirect);
    if (redirect) {
        obj.service = `${obj.service}?redirect=${encodeURIComponent(redirect)}`;
    }

    console.log(ticket, obj);

    const cas = new CAS(obj);
    const promise = new Promise((resolve, reject) => {
        cas.validate(ticket, (err, status, username, extended) => {
            if (err) {
                return reject(err);
            }
            return resolve({ username, status, extended });
        });
    });

    try {
        const info = await promise;
        if (!('status' in info) || !('username' in info)) {
            return { ok: false, user: {} };
        }

        console.log(info);
        if (info.status) {
            const uid = info.username;
            const user = await find_user(uid, 'uid');

            console.log(uid, user);

            if (!user) {
                if (!cas_info.use_ldap) {
                    return { ok: false, user: {} };
                }
                return { ok: false, user: {} };
            }
            do_standard_checks(user);
            return { ok: true, user };
        }
        return { ok: false, user: {} };
    } catch (err) {
        return { ok: false, user: {} };
    }
}

module.exports = {
    login_auth,
    cas_auth,
    get_cas_info,
};
