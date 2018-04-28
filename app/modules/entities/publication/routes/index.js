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
    const put_mware = RouterUtils.put_middlewares;
    /* router.put(`${puprefix}/publication`, compose([...put_mware(type, []),
        CrudController.put_with_action('publication',
        MyController.send_email, {})]));*/
}

module.exports = routes;
