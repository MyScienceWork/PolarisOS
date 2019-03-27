const path = require('path');

const all = {
    root: path.resolve(path.join(__dirname, '..')),
    elasticsearch: {
        index_prefix: 'pos',
    },
    logger: {
        logFile: 'polarisos.log',
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
        accessKey: 'D6WATDX0QDZ1I61CACYZ',
        secretKey: 'NdD50gVGH40OeK2s+W3kPnF+qU9DntxO2HwDT2luoC',
        secure: false,
        default_bucket: 'posbucket',
        sitemap_bucket: 'possitemap',
    },
    grobid: {
        host: 'localhost',
        port: '8070',
    },
    auth: {
        default_password: 'default_pos_password',
    },
    email: {
        default_sender: 'noreply@polarisos.com',
    },
    scheduler: {
        app: {
            interval: 120 * 1000,
        },
        api: {
            interval: 60 * 60 * 1000,
        },
    },
};

module.exports = all;
