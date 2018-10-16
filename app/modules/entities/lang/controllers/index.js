// @flow
const moment = require('moment');
const EntitiesUtils = require('../../../utils/entities');

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

module.exports = {
    retrieve_lang_items,
};
