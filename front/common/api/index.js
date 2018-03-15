const Request = require('superagent');
const Messages = require('./messages');
const LangUtils = require('../utils/lang');


async function fetch(object) {
    const { method, path, body, signature } = object;

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

async function download(object) {
    const { method, path, body, signature, default_filename } = object;

    let super_request = Request[method.toLowerCase()](path)
        .set('Authorization', `${signature.key}:${signature.sign}`)
        .set('X-MD-TIMESTAMP', signature.timestamp)
        .set('X-MD-LANG', LangUtils.grabLanguageFromLocalStorage());

    if (body != null && Object.keys(body).length > 0) {
        super_request = super_request.send(object.body);
    }

    super_request.responseType('blob');

    const res = await super_request;

    let filename = default_filename || 'default';
    const disposition = res.headers['content-disposition'];
    if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
    }

    return { filename, blob: res.body };
}

module.exports = {
    fetch,
    download,
};
