// @flow
const _ = require('lodash');
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../../config');
const RouterUtils = require('../../../utils/router');
const MyController = require('../controllers');
const Middlewares = require('../middlewares').M;

function routes(router: KoaRouter) {
    const type = 'exporter';
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;

    const post_mware = _.flatten([RouterUtils.koa_middlewares({}),
        RouterUtils.api_middlewares(type, 'c', { pass: true })]);

    const get_mware = RouterUtils.get_middlewares(type, Middlewares);

    router.post(`${puprefix}/export`, compose([...post_mware,
        MyController.export_information()]));
    router.get(`${puprefix}/export/bibliography`, compose([...get_mware,
        MyController.export_bibliography]));
}

module.exports = routes;
