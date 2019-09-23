// @flow
const EntitiesUtils = require('./entities');

async function get_profiles(): Promise<?Object> {
    const profiles = await EntitiesUtils.search_and_get_sources('user', {
    });

    if (profiles.length === 0) {
        return null;
    }

    return profiles;
}

module.exports = {
    get_profiles,
};
