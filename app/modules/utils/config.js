// @flow

const EntitiesUtils = require('./entities');
const EnvUtils = require('./env');

async function get_config(): Promise<?Object> {
    const configs = await EntitiesUtils.search_and_get_sources('config', {
        where: {
            environment: EnvUtils.get_current_environment(),
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
