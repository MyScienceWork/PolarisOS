const _ = require('lodash');

const env = process.env;

let hosts = ['http://localhost:9200'];
const port = env.NODE_PORT || 5556;

if (env.ES_HOSTS != null) {
    hosts = env.ES_HOSTS.split(',');
}

// MINIO
const minio = _.reduce({
    host: env.MINIO_HOST,
    port: parseInt(env.MINIO_PORT, 10),
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


const production = {
    port,
    elasticsearch: {
        hosts,
        version: '7.x',
    },
    minio,
    grobid,
    logger: {
        transports: {
            console: {
                level: 'info',
            },
            file: {
                level: 'verbose',
            },
        },
    },
    find_diseases: {
        host: 'http://finddiseases',
        port: 5001,
    },
    classification_rare: {
        host: 'http://classificationrare',
        port: 5001,
    },
    translation: {
        host: 'http://translation',
        port: 5001,
    },
};

module.exports = production;
