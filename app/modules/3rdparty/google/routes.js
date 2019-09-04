// @flow
const compose = require('koa-compose');
const KoaRouter = require('koa-router');
const config = require('../../../config');
const RouterUtils = require('../../utils/router');
const MyController = require('./controllers');

function routes(router: KoaRouter) {
    router.get(`/sitemap.xml`, compose([MyController.generate_sitemap_file]));
}

module.exports = routes;
