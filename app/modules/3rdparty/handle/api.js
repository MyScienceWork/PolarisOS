// @flow
const _ = require('lodash');
const ConfigUtils = require('../../utils/config');
const Logger = require('../../../logger');
const Request = require('superagent');

async function get_handle_config(): Promise<?Object> {
    const myconfig = await ConfigUtils.get_config();

    if (!myconfig || !('api' in myconfig) || !('handle' in myconfig.api)) {
        return null;
    }

    return myconfig.api.handle;
}

function generate_hs_admin(handle: string, index: number = 100,
        permissions: string = '1110',
        ttl: number = 86400, admin_permissions: string = '111111111111'): Object {
    return {
        index,
        type: 'HS_ADMIN',
        data: {
            format: 'admin',
            value: { handle, index: 200, permissions: admin_permissions },
        },
        permissions,
        ttl,
    };
}

function generate_url(url: string, index: number = 3,
        permissions: string = '1110', ttl: number = 86400): Object {
    return {
        index,
        type: 'URL',
        data: {
            format: 'string',
            value: url,
        },
        ttl,
        permissions,
    };
}

async function add_or_modify_handle(suffix: string, url: string,
    overwrite: boolean): Promise<boolean> {
    const handle_config = await get_handle_config();
    if (!handle_config) {
        Logger.error('Unable to find handle config in ES');
        return false;
    }

    const login = handle_config.admin_handle;
    const password = handle_config.admin_password;
    const ip = handle_config.ip;
    const port = handle_config.port;
    const prefix = handle_config.prefix;

    const hs_admin = generate_hs_admin(login);
    const hs_url = generate_url(url);

    try {
        const r = Request.put(`https://${ip}:${port}/api/handles/${prefix}/${suffix}`)
            .query({ overwrite })
            .auth(encodeURIComponent(login), encodeURIComponent(password))
            .send({
                values: [hs_admin, hs_url],
            });
        console.log(r);
        await r;
        return true;
    } catch (err) {
        Logger.error(`Unable to find add or modify handle ${prefix}/${suffix}`);
        Logger.error(err);
        return false;
    }
}

function add_handle(suffix: string, url: string): Promise<boolean> {
    return add_or_modify_handle(suffix, url, true);
}

function modify_handle(suffix: string, url: string): Promise<boolean> {
    return add_or_modify_handle(suffix, url, false);
}

async function delete_handle(suffix: string): Promise<boolean> {
    const handle_config = await get_handle_config();
    if (!handle_config) {
        Logger.error('Unable to find handle config in ES');
        return false;
    }

    const login = handle_config.admin_handle;
    const password = handle_config.admin_password;
    const ip = handle_config.ip;
    const port = handle_config.port;
    const prefix = handle_config.prefix;
    try {
        const r = await Request.del(`https://${ip}:${port}/api/handles/${prefix}/${suffix}`)
        .auth(encodeURIComponent(login), encodeURIComponent(password));
        return true;
    } catch (err) {
        Logger.error(`Unable to delete handle ${prefix}/${suffix}`);
        Logger.error(err);
        return false;
    }
}

async function get_handle(suffix: string, authenticated: boolean = true): Promise<?Object> {
    const handle_config = await get_handle_config();
    if (!handle_config) {
        Logger.error('Unable to find handle config in ES');
        return null;
    }

    const login = handle_config.admin_handle;
    const password = handle_config.admin_password;
    const ip = handle_config.ip;
    const port = handle_config.port;
    const prefix = handle_config.prefix;
    try {
        let r = Request.get(`https://${ip}:${port}/api/handles/${prefix}/${suffix}`);
        if (authenticated) {
            r = r.auth(encodeURIComponent(login), encodeURIComponent(password));
        }
        const result = await r;
        return result.body;
    } catch (err) {
        Logger.error(`Unable to retrieve handle ${prefix}/${suffix}`);
        Logger.error(err);
        return null;
    }
}

module.exports = {
    get_handle_config,
    add_handle,
    modify_handle,
    delete_handle,
    get_handle,
};
