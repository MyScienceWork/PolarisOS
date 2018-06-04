// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../../config');
const RouterUtils = require('../../../utils/router');
const MyController = require('../controllers');
const Middlewares = require('../middlewares');

function routes(router: KoaRouter) {
    // const type = 'user';
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;

    router.post(`${puprefix}/authenticate`, compose([...RouterUtils.koa_middlewares({}), MyController.authenticate]));

    router.post(`${puprefix}/iuser/access`, compose([...RouterUtils.koa_middlewares({}),
        ...RouterUtils.api_middlewares('authentication', 'r', { pass: true }), MyController.access]));

    RouterUtils.generate_put_routes(router, puprefix, 'my_user', Middlewares.MyUserM);
}

module.exports = routes;
