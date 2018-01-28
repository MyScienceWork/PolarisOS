const _ = require('lodash');
const Router = require('koa-router');
const Send = require('koa-send');
const Compose = require('koa-compose');
const Config = require('../config');
const RouterUtils = require('../modules/utils/router');
const BackRoutes = require('../../front/backoffice/routes');
const EntitiesUtils = require('../modules/utils/entities');
const UploadUtils = require('../modules/utils/uploads');
const UserRoutes = require('../modules/entities/user/routes');
const EntityRoutes = require('../modules/entities/entity/routes');

async function initialize_routes() {
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
    router.get('/view/:id', async (ctx) => {
        await ctx.render('front/views/front');
    });
    router.get('/u/:id/profile', async (ctx) => {
        await ctx.render('front/views/front');
    });
    router.get('/u/:id/favorites', async (ctx) => {
        await ctx.render('front/views/front');
    });
    router.get('/login', async (ctx) => {
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


    const response = await EntitiesUtils.search('entity', { size: 10000 });
    const extra_entities = response.result.hits.map(e => e.db.source.type);
    const entities = ['user', 'role', 'config', 'lang', 'form', 'function',
        'pipeline', 'widget', 'page', 'template', 'menu',
        'importer', 'exporter', 'connector', ...extra_entities];

    entities.forEach((e) => {
        RouterUtils.generate_entity_routes(router, e, []);
    });

    EntityRoutes(router);
    UserRoutes(router);

    const puprefix = `${Config.api.public.prefix}/${Config.api.public.version}`;
    router.post(`${puprefix}/single_upload`, Compose([...RouterUtils.upload_middlewares('upload',
        `${Config.root}/public/uploads`), UploadUtils.add_single('public')]));
    return router;
}

module.exports = initialize_routes;
