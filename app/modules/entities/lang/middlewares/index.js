// @flow
const KoaCache = require('../../../utils/koa-response-cache');
const Cache = require('../../../utils/cache');

async function clean_cache(ctx: Object, next: Function): Promise<any> {
    await KoaCache.clear({
        storage: Cache,
        entity: 'lang',
    });
    await next();
}

module.exports = {
    M: [clean_cache],
};
