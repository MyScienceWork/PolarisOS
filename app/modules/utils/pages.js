// @flow
const EntitiesUtils = require('./entities');

async function get_pages(): Promise<?Object> {
    const pages = await EntitiesUtils.search_and_get_sources('page', {
    });

    if (pages.length === 0) {
        return null;
    }

    return pages;
}

module.exports = {
    get_pages,
};
