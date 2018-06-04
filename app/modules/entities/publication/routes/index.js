// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../../config');
const RouterUtils = require('../../../utils/router');
const MyController = require('../controllers');
const Middlewares = require('../middlewares').M;
const CrudController = require('../../crud/controllers');

function routes(router: KoaRouter) {
    const type = 'publication';
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;

    RouterUtils.generate_gets_routes(router, puprefix, type, Middlewares);
    RouterUtils.generate_get_routes(router, puprefix, type, Middlewares);
    RouterUtils.generate_del_routes(router, puprefix, type, Middlewares);
    RouterUtils.generate_put_routes(router, puprefix, type, Middlewares, MyController.post_action, {});
    RouterUtils.generate_post_routes(router, puprefix, type, Middlewares, MyController.post_action, {});
}

module.exports = routes;
