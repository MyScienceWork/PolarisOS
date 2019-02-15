// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../../config');
const RouterUtils = require('../../../utils/router');
const MyController = require('../controllers');
const cache = require('@bubenguru/koa-response-cache');
const Utils = require('../../../utils/utils');
const Cache = require('../../../utils/cache');

function routes(router: KoaRouter) {
    const type = 'lang';
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;
    router.post(`${puprefix}/ilang/fetch`,
        compose([...RouterUtils.get_middlewares(type),
            cache.use({
                ttl: '3600s',
                key: ctx => Utils.hash_object(ctx.request.body),
                storage: Cache,
            }),
            MyController.retrieve_lang_items]));
}

module.exports = routes;
