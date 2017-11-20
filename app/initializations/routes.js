const _ = require('lodash');
const Router = require('koa-router');
const Send = require('koa-send');
const Config = require('../config');
const RouterUtils = require('../modules/utils/router');
const BackRoutes = require('../../front/backoffice/routes');

function initialize_routes() {
    const router = new Router();

    router.get('/', async (ctx) => {
        await ctx.render('front/views/front');
    });

    router.get('/news', async (ctx) => {
        await ctx.render('front/views/front');
    });
    router.get('/browse', async (ctx) => {
        await ctx.render('front/views/front');
    });
    router.get('/search', async (ctx) => {
        await ctx.render('front/views/front');
    });
    router.get('/deposit', async (ctx) => {
        await ctx.render('front/views/front');
    });
    router.get('/help', async (ctx) => {
        await ctx.render('front/views/front');
    });
    router.get('/u/:id/profile', async (ctx) => {
        await ctx.render('front/views/front');
    });
    router.get('/u/:id/favorites', async (ctx) => {
        await ctx.render('front/views/front');
    });

    _.each(BackRoutes, (route) => {
        router.get(route, async (ctx) => {
            await ctx.render('back/views/back');
        });
    });

    router.get('/public/*', async (ctx) => {
        await Send(ctx, ctx.path, { root: Config.root });
    });

    const entities = ['citation', 'user', 'config', 'lang', 'form', 'datatemplate', 'typology', 'langref', 'journal', 'keystore'];

    entities.forEach((e) => {
        RouterUtils.generate_entity_routes(router, e, []);
    });
    return router;
}

module.exports = initialize_routes;
