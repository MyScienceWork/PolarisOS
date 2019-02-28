// @flow
const Feed = require('feed');
const EntitiesUtils = require('../../utils/entities');
const LangUtils = require('../../utils/lang');
const Errors = require('../../exceptions/errors');
const Handlebars = require('../../utils/templating');
const Request = require('superagent');


async function handle_call_api(ctx: Object): Promise<*> {
    const body = ctx.request.body;
    const url = body.url;
    const method = body.method;
    const payload_body = body.body;

    let r;

    if (method === 'GET') {
        r = await Request.get(url).set('Accept', 'application/json');
    } else if (method === 'PUT') {
        r = await Request.post(url).set('Accept', 'application/json').send(payload_body);
    } else if (method === 'POST') {
        r = await Request.post(url).set('Accept', 'application/json').send(payload_body);
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
