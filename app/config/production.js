const env = process.env;

let hosts = ['http://localhost:9200'];
const port = env.NODE_PORT || 5556;

if (env.ES_HOSTS != null) {
    hosts = env.ES_HOSTS.split(',');
}

const production = {
    port,
    elasticsearch: {
        hosts,
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
