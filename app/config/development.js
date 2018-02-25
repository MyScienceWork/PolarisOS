const development = {
    port: 4002,
    elasticsearch: {
        hosts: [
            'http://localhost:9200',
        ],
        apiVersion: '5.2',
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
};

module.exports = development;
