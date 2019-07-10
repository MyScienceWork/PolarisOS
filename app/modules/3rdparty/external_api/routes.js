// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../config');
const MyController = require('./controllers');
const RouterUtils = require('../../utils/router');

function routes(router: KoaRouter) {
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;
    router.put(`${puprefix}/external`, compose([...RouterUtils.koa_middlewares({}), MyController.put_call_external_api]));
    router.post(`${puprefix}/external`, compose([...RouterUtils.koa_middlewares({}), MyController.post_call_external_api]));
}

module.exports = routes;
