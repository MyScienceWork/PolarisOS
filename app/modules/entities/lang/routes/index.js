// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../../config');
const RouterUtils = require('../../../utils/router');
const MyController = require('../controllers');


function routes(router: KoaRouter) {
    const type = 'lang';
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;
    router.post(`${puprefix}/ilang/fetch`,
        compose([...RouterUtils.get_middlewares(type),
            MyController.cache_all_lang(),
            MyController.retrieve_lang_items]));
}

module.exports = routes;
