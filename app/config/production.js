const production = {
    port: 5556,
    elasticsearch: {
        hosts: ['localhost:9200'],
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
