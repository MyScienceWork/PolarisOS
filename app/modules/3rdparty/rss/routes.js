// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../config');
const RouterUtils = require('../../utils/router');
const MyController = require('./controllers');

function routes(router: KoaRouter) {
    const puprefix = `${config.api.public.prefix}/${config.api.public.version}`;
    router.get(`${puprefix}/rss/:entity/:mapping/:query/:sort/:size`, compose([MyController.generate_rss_feed]));
    router.get(`${puprefix}/rss/:entity/:mapping/:query/:sort`, compose([MyController.generate_rss_feed]));
    router.get(`${puprefix}/rss/:entity/:mapping/:query`, compose([MyController.generate_rss_feed]));
    router.get(`${puprefix}/rss/:entity/:mapping`, compose([MyController.generate_rss_feed]));
}

module.exports = routes;
