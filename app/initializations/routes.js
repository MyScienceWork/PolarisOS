const _ = require('lodash');
const Router = require('koa-router');
const Send = require('koa-send');
const Compose = require('koa-compose');
const Config = require('../config');
const RouterUtils = require('../modules/utils/router');
const BackRoutes = require('../../front/backoffice/routes');
const CommonRoutes = require('../../front/common/routes');
const EntitiesUtils = require('../modules/utils/entities');
const UploadUtils = require('../modules/utils/uploads');
const UserRoutes = require('../modules/entities/user/routes');
const EntityRoutes = require('../modules/entities/entity/routes');
const ImporterRoutes = require('../modules/entities/importer/routes');
const ExporterRoutes = require('../modules/entities/exporter/routes');
const RssRoutes = require('../modules/3rdparty/rss/routes');

async function initialize_routes() {
    const router = new Router();

    CommonRoutes.forEach((route) => {
        router.get(route, async (ctx) => {
            await ctx.render('front/views/front');
        });
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
        'pipeline', 'widget', 'page', 'template', 'menu', 'query',
        'importer', 'exporter', 'connector', 'publication', ...extra_entities];

    entities.forEach((e) => {
        RouterUtils.generate_entity_routes(router, e, []);
    });

    EntityRoutes(router);
    UserRoutes(router);
    ImporterRoutes(router);
    ExporterRoutes(router);
    RssRoutes(router);

    const puprefix = `${Config.api.public.prefix}/${Config.api.public.version}`;
    router.post(`${puprefix}/single_upload`, Compose([...RouterUtils.upload_middlewares('upload',
        `${Config.root}/public/uploads`), UploadUtils.add_single]));
    router.get('/download/:entity/:eid/:filename', Compose([UploadUtils.download]));
    router.get('/downloads/:entity/:eid/:names/:filenames', Compose([UploadUtils.multi_download]));
    return router;
}

module.exports = initialize_routes;
