// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../../config');
const RouterUtils = require('../../../utils/router');
const MyController = require('../controllers');
const Middlewares = require('../middlewares').M;

function routes(router: KoaRouter) {
    const type = 'tracking_stat';
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;

    router.post(`${puprefix}/itracking_stat/add`, compose([...RouterUtils.koa_middlewares({}),
        ...RouterUtils.api_middlewares(type, 'c', { pass: true }), MyController.add_stat]));
}

module.exports = routes;
