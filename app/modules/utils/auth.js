// @flow
const CAS = require('cas');
const Request = require('superagent');
const Crypto = require('crypto');
const Config = require('../../config');
const Logger = require('../../logger');
const EntitiesUtils = require('./entities');
const LangUtils = require('./lang');
const Utils = require('./utils');
const Errors = require('../exceptions/errors');
const LDAP = require('ldapjs');
const MURL = require('url');

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

async function get_cas_info(global_config: Object): Promise<?Object> {
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

async function find_through_ldap(uid: string, config: Object): Promise<?Object> {
    const base = Utils.find_value_with_path(config, 'authentication.ldap.base'.split('.'));
    const dns = Utils.find_value_with_path(config, 'authentication.ldap.dns'.split('.'));
    const attributes = Utils.find_value_with_path(config, 'authentication.ldap.attributes'.split('.'));

    if (!base || !dns || !attributes) {
        return null;
    }

    const uid_key = attributes.find(attr => attr.value === 'uid');

    if (!uid_key) {
        return null;
    }

    const keys = attributes.map(attr => attr.key);
    const client = LDAP.createClient({
        url: base,
    });

    const opts = {
        attributes: keys,
        scope: 'sub',
        filter: `(${uid_key.key}=${uid})`,
    };

    const promised_users = new Promise((resolve, reject) => {
        client.search(dns, opts, (err, res) => {
            const entries = [];
            res.on('searchEntry', (entry) => {
                entries.push(entry.object);
            });
            res.on('error', (_err) => {
                reject(_err);
            });
            res.on('end', () => {
                resolve(entries);
            });
        });
    });

    const users = await promised_users;


    if (users.length === 0) {
        return null;
    }

    return users[0];
}

async function map_ldap_to_pos(ldap_user: Object, config: Object): Promise<?Object> {
    const attributes = Utils.find_value_with_path(config, 'authentication.ldap.attributes'.split('.'));
    const default_role = Utils.find_value_with_path(config, 'authentication.default_assigned_role'.split('.'));

    if (!attributes || !default_role || default_role.trim() === '') {
        return null;
    }

    const pos_user = attributes.reduce((obj, attr) => {
        const { key, value } = attr;

        if (key in ldap_user) {
            if (value === 'email') {
                obj.emails = [{ email: ldap_user[key], master: true }];
            } else {
                obj[value] = ldap_user[key];
            }
        }
        return obj;
    }, {});

    pos_user.roles = [{ _id: default_role }];
    pos_user.ldap = true;
    pos_user.preferred_language = 'EN';
    return pos_user;
}

async function cas_auth(ticket: string, url: string): Promise<Object> {
    const global_config = await LangUtils.get_config(Config._env);

    if (!global_config) {
        Logger.error('No config found in ES...');
        return { ok: false, user: {} };
    }

    const cas_info = await get_cas_info(global_config);
    if (!cas_info) {
        return { ok: false, user: {} };
    }

    const my_url = new MURL.URL(`${cas_info.service}${url}`);
    my_url.searchParams.delete('ticket');

    console.log(my_url.href, cas_info.service, url);
    const obj = {
        base_url: cas_info.base,
        service: my_url.href,
        version: 2.0,
    };

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
        console.log('cas', info);
        if (!('status' in info) || !('username' in info)) {
            return { ok: false, user: {} };
        }

        if (info.status) {
            const uid = info.username.toLowerCase();
            let user = await find_user(uid, 'uid');

            if (!user) {
                if (!cas_info.use_ldap) {
                    return { ok: false, user: {} };
                }
                const ldap_user = await find_through_ldap(uid, global_config);

                if (!ldap_user) {
                    return { ok: false, user: {} };
                }

                user = await map_ldap_to_pos(ldap_user, global_config);

                // Update to say that the user is using SSO
                user.sso = true;

                if (!user) {
                    return { ok: false, user: {} };
                }

                const pos_base_url = Utils.find_value_with_path(global_config, 'base_url'.split('.'));
                const puprefix = `${Config.api.public.prefix}/${Config.api.public.version}`;
                if (!pos_base_url || pos_base_url.trim() === '') {
                    return { ok: false, user: {} };
                }
                try {
                    const response = await Request.post(`${pos_base_url}${puprefix}/user`)
                        .send(user);
                    if (!response) {
                        return { ok: false, user: {} };
                    }

                    const json_response = JSON.parse(response.text);

                    if ('change' in json_response && 'entity' in json_response) {
                        user = json_response.entity.source;
                    } else {
                        return { ok: false, user: {} };
                    }
                } catch (err) {
                    Logger.error('Error when creating user');
                    Logger.error(err);
                    return { ok: false, user: {} };
                }
            }
            do_standard_checks(user);
            return { ok: true, user };
        }
        return { ok: false, user: {} };
    } catch (err) {
        Logger.error('Error when authenticating user');
        Logger.error(err);
        return { ok: false, user: {} };
    }
}

module.exports = {
    login_auth,
    cas_auth,
    get_cas_info,
};
