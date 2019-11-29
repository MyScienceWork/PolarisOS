const _ = require('lodash');

const env = process.env;

let hosts = null;
if (env.ES_HOSTS != null) {
    hosts = env.ES_HOSTS.split(',');
}
const port = env.NODE_PORT;
// MINIO
const minio = _.reduce({
    host: env.MINIO_HOST,
    port: parseInt(env.MINIO_PORT),
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
    secure: env.MINIO_SECURE ? env.MINIO_SECURE.toLowerCase() === 'true' : null,
}, (obj, val, key) => {
    if (val) {
        obj[key] = val;
    }
    return obj;
}, {});

// GROBID
const grobid = _.reduce({
    host: env.GROBID_HOST,
    port: env.GROBID_PORT,
}, (obj, val, key) => {
    if (val) {
        obj[key] = val;
    }
    return obj;
}, {});


const from_env = {};

if (port) {
    from_env.port = port;
}

if (hosts) {
    from_env.elasticsearch = { hosts };
}

from_env.minio = minio;
from_env.grobid = grobid;
module.exports = from_env;
