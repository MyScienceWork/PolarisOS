// @flow
const Request = require('superagent');
const config = require('../../../config');
const utils = require('../../utils/utils');

function replace_conf(config_key) {
    if (config_key && config_key.startsWith('config.')) {
        const config_path = config_key.split('.');
        config_path.shift();
        return utils.find_value_with_path(config, config_path);
    }
    return '';
}

async function handle_call_api(ctx: Object): Promise<*> {
    let body = ctx.request.body;
    if (body.where) {
        body = body.where;
    }
    let host = body.host;
    let port = body.port;
    const uri = body.uri;
    const method = body.method;
    const payload_body = body.body;

    host = replace_conf(host);
    port = replace_conf(port);

    const path_service = `${host}:${port}${uri}`;

    let r;
    if (method === 'GET') {
        r = await Request.get(path_service).set('Accept', 'application/json');
    } else if (method === 'PUT') {
        r = await Request.post(path_service).set('Accept', 'application/json').send(payload_body);
    } else if (method === 'POST') {
        r = await Request.post(path_service).set('Accept', 'application/json').send(payload_body);
    }

    ctx.set('Content-Type', 'application/json');
    try {
        ctx.body = JSON.stringify(JSON.parse(r.text));
    } catch (e) {
        ctx.body = {};
    }
}

async function post_call_external_api(ctx: Object): Promise<*> {
    await handle_call_api(ctx);
}

async function put_call_external_api(ctx: Object): Promise<*> {
    await handle_call_api(ctx);
}

module.exports = {
    put_call_external_api,
    post_call_external_api,
};
