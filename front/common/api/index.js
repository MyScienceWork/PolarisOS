const Request = require('superagent');
const Messages = require('./messages');
const LangUtils = require('../utils/lang');


async function fetch(object) {
    const { method, path, body, commit, signature } = object;

    let super_request = Request[method.toLowerCase()](path)
        .set('Authorization', `${signature.key}:${signature.sign}`)
        .set('X-MD-TIMESTAMP', signature.timestamp)
        .set('X-MD-LANG', LangUtils.grabLanguageFromLocalStorage());

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
