// @flow
const EntitiesUtils = require('./entities');

async function get_publications(): Promise<?Object> {
    const publications = await EntitiesUtils.search_and_get_sources('publication', {
    });

    if (publications.length === 0) {
        return null;
    }

    return publications;
}

module.exports = {
    get_publications,
};
