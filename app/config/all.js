const path = require('path');

const all = {
    root: path.resolve(path.join(__dirname, '..')),
    elasticsearch: {
        index_prefix: 'pos',
    },
    logger: {
        logFile: 'midstod.log',
    },
    api: {
        public: {
            version: 'v2',
            prefix: '/api/public',
        },
        private: {
            version: 'v2',
            prefix: '/api/private',
        },
        interval: [120000, 120000],
    },
    minio: {
        host: 'localhost',
        port: 9000,
        accessKey: 'D6WOTGX0QWJ0I61CACYZ',
        secretKey: 'NdD4gVGH3OeK3s+W4kPnF+qU8DntxO1HwDT0luoC',
        secure: false,
        default_bucket: 'posbucket',
    },
    grobid: {
        host: 'localhost',
        port: '8070',
    },
    entities: [{
        name: 'citation',
        text: 'Citation',
    },
    {
        name: 'apiuser',
        text: 'User of API',
    },
    {
        name: 'user',
        text: 'User',
    },
    {
        name: 'institution',
        text: 'Institution',
    },
    ],
};

module.exports = all;
