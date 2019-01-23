const _ = require('lodash');
const Router = require('koa-router');
const Send = require('koa-send');
const Compose = require('koa-compose');
const Config = require('../config');
const RouterUtils = require('../modules/utils/router');
const BackRoutes = require('../../front/backoffice/routes');
const EntitiesUtils = require('../modules/utils/entities');
const UploadUtils = require('../modules/utils/uploads');
const AuthUtils = require('../modules/utils/auth');
const UserRoutes = require('../modules/entities/user/routes');
const EntityRoutes = require('../modules/entities/entity/routes');
const ImporterRoutes = require('../modules/entities/importer/routes');
const ExporterRoutes = require('../modules/entities/exporter/routes');
const PublicationRoutes = require('../modules/entities/publication/routes');
const RssRoutes = require('../modules/3rdparty/rss/routes');
const TrackingRoutes = require('../modules/entities/tracking_stat/routes');
const LangRoutes = require('../modules/entities/lang/routes');

const index_prefix = Config.elasticsearch.index_prefix;

async function initialize_routes(singleton) {
    const router = new Router();

    const send_opts = {
        root: Config.root,
    };

    if (Config._env === 'production') {
        send_opts.maxage = 1000 * 60 * 60 * 24 * 7; // 7 days;
    } else {
        send_opts.maxage = 0;
    }

    const common_page_sources = await EntitiesUtils
        .search_and_get_sources('page', { size: 10000, projection: ['route'] });
    const common_routes = common_page_sources.map(src => src.route);
    common_routes.forEach((route) => {
        router.get(route, async (ctx) => {
            await ctx.render('front/views/front');
        });
    });

    router.get('/login', async (ctx) => {
        await ctx.render('front/views/front');
    });

    router.get('/login/choice', async (ctx) => {
        await ctx.render('front/views/front');
    });

    _.each(BackRoutes, (route) => {
        router.get(route, async (ctx) => {
            await ctx.render('back/views/back');
        });
    });

    router.get('/public/*', async (ctx) => {
        await Send(ctx, ctx.path, send_opts);
    });


    const response = await EntitiesUtils.search('entity', { size: 10000 });
    const extra_entities = response.result.hits.map(e => e.db.source.type);
    const entities = ['user', 'role', 'config', 'form', 'function',
        'pipeline', 'widget', 'page', 'template', 'menu', 'query',
        'importer', 'exporter', 'connector', 'identifier', 'workflow',
        'chart', 'mail_template', 'tracking_stat', 'system_report', ...extra_entities];

    entities.forEach((e) => {
        RouterUtils.generate_entity_routes(router, e, []);
    });

    EntityRoutes(router, singleton);
    UserRoutes(router, singleton);
    ImporterRoutes(router, singleton);
    ExporterRoutes(router, singleton);
    RssRoutes(router, singleton);
    TrackingRoutes(router, singleton);
    LangRoutes(router, singleton);

    if (['msw', 'uspc', 'inserm'].indexOf(index_prefix) === -1) {
        PublicationRoutes(router, singleton);
    } else {
        RouterUtils.generate_entity_routes(router, 'publication', []);
    }

    const puprefix = `${Config.api.public.prefix}/${Config.api.public.version}`;
    router.post(`${puprefix}/single_upload`, Compose([...RouterUtils.upload_middlewares('upload',
        `${Config.root}/public/uploads`), UploadUtils.add_single]));
    router.get('/download/:entity/:eid/:filename', Compose([UploadUtils.download]));
    router.get('/gdownload/:entity/:eid/:filename', Compose([UploadUtils.generic_download]));
    router.get('/downloads/:entity/:eid/:names/:filenames', Compose([UploadUtils.multi_download]));
    return router;
}

module.exports = initialize_routes;
