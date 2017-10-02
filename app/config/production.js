const production = {
    port: 5556,
    elasticsearch: {
        hosts: [
            'http://51.254.46.169:9200',
            'http://176.31.234.165:9200',
        ],
        version: '5.2',
    },
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
};

module.exports = production;
