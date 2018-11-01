// @flow
const _ = require('lodash');
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../../config');
const RouterUtils = require('../../../utils/router');
const MyController = require('../controllers');
const MyControllerMasas = require('../controllers/masas');
const MyControllerRepec = require('../controllers/repec');
const SwordController = require('../controllers/sword');
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
    router.get(`${puprefix}/export/masas`, compose([...get_mware,
        MyControllerMasas.export_masas]));
    router.post(`${puprefix}/export/hal`, compose([...post_mware,
        SwordController.create_controller]));
    router.get('/api/private/repec/edi/:handle',
		compose([...get_mware, MyControllerRepec.export_repec]));
    router.get('/api/private/repec/edi/:handle/wpaper',
        compose([...get_mware, MyControllerRepec.export_repec_paper]));
    router.get('/api/private/repec/edi/:handle/:rdf',
		compose([...get_mware, MyControllerRepec.export_repec]));
    router.get('/api/private/repec/edi/:handle/wpaper/:rdf',
		compose([...get_mware, MyControllerRepec.export_repec_paper]));
}

module.exports = routes;
