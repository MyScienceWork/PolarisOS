// @flow
const Feed = require('feed');
const EntitiesUtils = require('../../utils/entities');
const LangUtils = require('../../utils/lang');
const Errors = require('../../exceptions/errors');
const Handlebars = require('../../utils/templating');
const Request = require('superagent');
const config = require('../../../config');
const utils = require('../../utils/utils');


async function handle_call_api(ctx: Object): Promise<*> {
    const body = ctx.request.body;
    let host = body.host;
    let port = body.port;
    const uri = body.uri;
    const method = body.method;
    const payload_body = body.body;

    if (host.startsWith('config.')) {
        const config_path = host.split('.');
        config_path.shift();
        host = utils.find_value_with_path(config, config_path);
    }
    if (port.startsWith('config.')) {
        const config_path = port.split('.');
        config_path.shift();
        port = utils.find_value_with_path(config, config_path);
    }

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
    ctx.body = JSON.stringify(JSON.parse(r.text));
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
