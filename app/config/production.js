const env = process.env;

let hosts = ['http://localhost:9200'];

if (env.ES_HOSTS != null) {
    hosts = env.ES_HOSTS.split(',');
}

const production = {
    port: 5556,
    elasticsearch: {
        hosts,
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
