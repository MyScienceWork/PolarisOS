const EntitiesUtils = require('./entities');

const env = process.env.NODE_ENV || 'development';

async function get_config() {
    const configs = await EntitiesUtils.search_and_get_sources('config', {
        where: {
            environment: env,
        },
        size: 1,
    });

    if (configs.length === 0) {
        return null;
    }

    return configs[0];
}

module.exports = {
    get_config,
};
