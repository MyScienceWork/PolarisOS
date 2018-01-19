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
