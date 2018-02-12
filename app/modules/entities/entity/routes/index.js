// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../../config');
const RouterUtils = require('../../../utils/router');
const MyController = require('../controllers');
const Middlewares = require('../middlewares').M;
const CrudController = require('../../crud/controllers');

function routes(router: KoaRouter) {
    const type = 'entity';
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;

    RouterUtils.generate_get_routes(router, puprefix, type, []);
    RouterUtils.generate_del_routes(router, puprefix, type, []);
    RouterUtils.generate_put_routes(router, puprefix, type, []);

    const post_mware = RouterUtils.post_middlewares(type, []);
    router.post(`${puprefix}/${type}`, compose([...post_mware,
        CrudController.post_with_action(type, MyController.create_route, { router })]));
    router.post(`${puprefix}/${type}/validate`, compose([...post_mware, CrudController.validate]));
}

module.exports = routes;
