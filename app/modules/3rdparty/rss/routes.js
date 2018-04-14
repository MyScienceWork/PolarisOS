// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../../config');
const RouterUtils = require('../../../utils/router');
const MyController = require('./controllers');

function routes(router: KoaRouter) {
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;
    router.post(`${puprefix}/rss`, compose([...RouterUtils.koa_middlewares({}), MyController.generate_rss_feed]));
}

module.exports = routes;
