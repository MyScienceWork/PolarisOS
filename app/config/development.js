const development = {
    port: 4002,
    elasticsearch: {
        hosts: [
            'http://pos:swnEvjbnkRdRRuker66ifBuGu9@localhost:9201',
        ],
        apiVersion: '6.8',
    },
    grobid: {
        host: 'gitlab.cocophotos.eu',
        port: 9090,
    },
    logger: {
        transports: {
            console: {
                level: 'debug',
            },
            file: {
                level: 'verbose',
            },
        },
    },
    scheduler: {
        app: {
            interval: 30 * 1000,
        },
        api: {
            interval: 45 * 1000,
        },
    },
    find_diseases: {
        host: 'http://localhost',
        port: 5001,
    },
    classification_rare: {
        host: 'http://localhost',
        port: 5002,
    },
    translation: {
        host: 'http://localhost',
        port: 5003,
    },
};

module.exports = development;
