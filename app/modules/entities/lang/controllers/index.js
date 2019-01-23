// @flow
const EntitiesUtils = require('../../../utils/entities');
const KoaCache = require('../../../utils/koa-response-cache');
const Utils = require('../../../utils/utils');
const Cache = require('../../../utils/cache');

async function retrieve_lang_items(ctx: Object): Promise<any> {
    const body = ctx.request.body;
    const results = await EntitiesUtils.search_and_get_sources('lang', body);
    ctx.body = results.reduce((obj, l) => {
        const lang = obj[l.lang] || {};
        lang[l.key] = l.values.reduce((values, v) => {
            values[v.quantity] = v.value;
            return values;
        }, {});
        obj[l.lang] = lang;
        return obj;
    }, {});
}

function cache_all_lang(): Promise<any> {
    return KoaCache.use({
        ttl: '0s',
        key: ctx => Utils.hash_object(ctx.request.body),
        storage: Cache,
        entity: 'lang',
    });
}

module.exports = {
    cache_all_lang,
    retrieve_lang_items,
};
