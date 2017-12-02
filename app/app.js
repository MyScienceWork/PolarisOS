const Koa = require('koa');
const winstonKoaLogger = require('winston-koa-logger');
const logger = require('./logger');
const cors = require('kcors');
const router = require('./initializations/routes');
const config = require('./config');
const views = require('koa-views');
const koaqs = require('koa-qs');

let koa = new Koa();
koa = koaqs(koa, 'strict');

koa.use(cors());
koa.use(winstonKoaLogger(logger));
koa.use(async (context, next) => {
    try {
        await next();
    } catch (err) {
        logger.error(err.message);
        logger.debug(err);
        err.expose = true; // expose the error to the context;
        context.status = err.status || 500;
        context.body = {
            message: err.message,
            error: err.name,
            code: err.status,
        };
    }
});

koa.use(views(`${config.root}/public`));

process.on('message', (message) => {
    if (message === 'shutdown') {
        // performCleanup();
        process.exit(0);
    }
});

(async () => {
    const koa_router = await router();
    koa.use(koa_router.routes());
    koa.use(koa_router.allowedMethods());
    logger.info('Starting koalication...');
    await koa.listen(config.port);
    logger.info(`Midstod started on port ${config.port}`);
    if (process.send) {
        process.send('online');
    }
})();
