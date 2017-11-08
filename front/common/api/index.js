const Request = require('superagent');
const Messages = require('./messages');


async function fetch(object) {
    const { method, path, body, commit } = object;

    let super_request = Request[method.toLowerCase()](path)
        .set('Authorization', 'bfa3e803-217e-4f00-97ed-5f6417464484N1a-FmKtW:test');
    if (body != null && Object.keys(body).length > 0) {
        super_request = super_request.send(object.body);
    }

    try {
        const res = await super_request;
        return {
            type: Messages.SUCCESS,
            content: res.body,
        };
    } catch (err) {
        return {
            type: Messages.FAILURE,
            content: err.response != null ? err.response.body : err,
        };
    }
}

module.exports = {
    fetch,
};
