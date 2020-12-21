const env = process.env;

let hosts = ['http://localhost:9200'];

if (env.ES_HOSTS != null) {
    hosts = env.ES_HOSTS.split(',');
}

let index_prefix = 'pos';
if (env.ES_INDEX_PREFIX != null) {
    index_prefix = env.ES_INDEX_PREFIX;
}

const production = {
    port: 5556,
    elasticsearch: {
        index_prefix,
        hosts,
    },
    logger: {
        transports: {
            console: {
                level: 'debug',
            },
            file: {
                level: 'debug',
            },
        },
    },
};

module.exports = production;
