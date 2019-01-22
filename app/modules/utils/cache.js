// @flow
const EntitiesUtils = require('./entities');
const Logger = require('../../logger');

const Cache = {
    /**
     * Set value to cache
     * @param {String} key Cache key
     * @param {*} data JSON-serializable data
     * @param {Number} [ttl=0] Cache lifetime in milliseconds
     * @throws {TypeError} If meet cyclic object value
     */
    async set(key, data, ttl = 0) {
        const payload = { key, value: JSON.stringify(data), ttl, createdAt: new Date() };
        await EntitiesUtils.update(payload, 'cache');
    },

    /**
     * Retrieve data from cache by key
     * @param {String} key Cache key
     * @return {Any|undefined} Cached value or undefined if cache is expired or not exists
     * @throws {SyntaxError} If can't parse cached data
     */
    async get(key) {
        const response = await EntitiesUtils.search_and_get_sources('cache', { where: {
            $and: [{ key }],
        }});
        if (response.length > 0) {
            const ttl = response[0].ttl;
            const createdAt = new Date(response[0].createdAt);
            const now = new Date();
            const difference_ms = now.getTime() - createdAt.getTime();

            if (difference_ms > ttl) {
                this.remove(response[0]._id);
                return;
            }

            let lang = {};
            try {
                lang = JSON.parse(response[0].value);
            } catch (e) {
                Logger.error('Lang parsing error:', e);
            }
            return lang;
        }
        return;
    },

    /**
     * Remove key from cache
     * @param {String} key Cache key
     */
    async remove(id) {
        await EntitiesUtils.remove(id, 'cache');
    },

    /**
     * Remove keys and nested keys
     * @param {String} key First part of key
     */
    async clear() {
    },
};

module.exports = Cache;
