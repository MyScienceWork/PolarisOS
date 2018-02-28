// @flow

const compose = require('koa-compose');
const _ = require('lodash');
const KoaBody = require('koa-body');
const KoaRouter = require('koa-router');
const Multer = require('koa-multer');
const Config = require('../../config');
const Access = require('../auth/access');
const ApiAccess = require('../auth/api_access');
const RateLimiter = require('../rate_limit/limit');
const CrudController = require('../entities/crud/controllers');
const Pipeline = require('./../pipeline/pipeline');
const FS = require('fs');
const Mime = require('mime');
const Crypto = require('crypto');

/**
 * Generate default Koa middlewares
 * @param opts - Extra options:
 * - koa_body: object to pass to KoaBody middleware
 * @returns Array of middlewares
 */
function koa_middlewares(opts: Object): Array<Function> {
    if ('koa_body' in opts) {
        return [KoaBody(opts.koa_body)];
    }
    return [KoaBody()];
}

/**
 * Generate API middlewares
 * @param type - type of entity
 * @param access_type - one of c, r, u, d (for create, read, update, delete)
 * @param opts - extra options (notably with flag pass, to deactivate API authorization checks
 * @returns Array of middlewares
 */
function api_middlewares(type: string,
        access_type: string, opts: Object): Array<Function> {
    const pass = 'pass' in opts ? opts.pass : false;
    return [ApiAccess.api_signature(pass),
        RateLimiter.limit(),
        Access.access(type, access_type, pass),
        Access.enforce_right,
    ];
}

/**
 * Generate App middlewares
 * @param type - type of entity
 * @param opts - extra options:
 * - extra_middlewares: array of extra middlewares to be injected before validation
 * @returns Array of middlewares
 */
function app_middlewares(type: string, opts: Object): Array<Function> {
    const emiddlewares = 'extra_middlewares' in opts ? opts.extra_middlewares : [];
    return [
        Pipeline.memoize_model(type),
        Pipeline.check(type),
        Pipeline.transform(type),
        Pipeline.merge(type),
        Pipeline.reset(type),
        Pipeline.defaults(type),
        Pipeline.format(type),
        Pipeline.complete(type),
        Pipeline.filter(type),
        // Pipeline.format(type),
        ...emiddlewares,
        Pipeline.validate(type),
    ];
}

function get_middlewares(type: string) {
    return _.flatten([koa_middlewares({}),
        api_middlewares(type, 'r', { pass: true }),
    ]);
}

function del_middlewares(type: string) {
    return _.flatten([koa_middlewares({}),
        api_middlewares(type, 'd', { pass: true }),
    ]);
}

function put_middlewares(type: string, emid: Array<Function>, model: ?Object) {
    return _.flatten([
        koa_middlewares({}),
        api_middlewares(type, 'u', { pass: true }),
        app_middlewares(type, { extra_middlewares: emid || [], model }),
    ]);
}

function post_middlewares(type: string, emid: Array<Function>, model: ?Object) {
    return _.flatten([
        koa_middlewares({}),
        api_middlewares(type, 'c', { pass: true }),
        app_middlewares(type, { extra_middlewares: emid || [], model }),
    ]);
}

function upload_middlewares(type: string, dest: string, emid: Array<Function>, model: ?Object) {
    try {
        FS.mkdirSync(dest);
    } catch (err) {
    }

    const storage = Multer.diskStorage({
        destination(req, file, cb) {
            cb(null, dest);
        },
        filename(req, file, cb) {
            Crypto.pseudoRandomBytes(16, (err, raw) => {
                cb(null, `${raw.toString('hex') + Date.now()}.${Mime.getExtension(file.mimetype)}`);
            });
        },
    });
    const upload = Multer({ storage });
    return _.flatten([
        [upload.single('file'),
            async (ctx, next) => {
                ctx.request.body = ctx.req.body;
                ctx.request.file = ctx.req.file;
                return next();
            }],
        api_middlewares(type, 'c', { pass: true }),
        // app_middlewares(type, { extra_middlewares: emid || [], model }),
    ]);
}

function generate_gets_routes(router: KoaRouter, prefix: string, type: string, emiddlewares: Array<Function>) {
    const get_mware = get_middlewares(type);

    router.get(`${prefix}/${type}s/count`, compose([...get_mware, CrudController.count(type)]));

    router.post(`${prefix}/${type}s/count`, compose([...get_mware, CrudController.count(type)]));

    router.post(`${prefix}/${type}s/search`, compose([...get_mware, CrudController.search(type)]));
    router.post(`${prefix}/${type}s/search/:translatable/:lang`, compose([...get_mware, CrudController.search(type)]));

    router.get(`${prefix}/${type}s/:projection/:population`, compose([...get_mware, CrudController.gets(type)]));
    router.get(`${prefix}/${type}s/:projection`, compose([...get_mware, CrudController.gets(type)]));
    router.get(`${prefix}/${type}s`, compose([...get_mware, CrudController.gets(type)]));

    router.post(`${prefix}/${type}s/:projection/:population`, compose([...get_mware, CrudController.gets(type)]));
    router.post(`${prefix}/${type}s/:projection`, compose([...get_mware, CrudController.gets(type)]));
    router.post(`${prefix}/${type}s`, compose([...get_mware, CrudController.gets(type)]));
}

function generate_get_routes(router: KoaRouter, prefix: string, type: string, emiddlewares: Array<Function>) {
    const get_mware = get_middlewares(type);

    router.get(`${prefix}/${type}/exists/:id`, compose([...get_mware, CrudController.get(type, true)]));

    router.get(`${prefix}/${type}/:id/:projection/:population`, compose([...get_mware, CrudController.get(type)]));
    router.get(`${prefix}/${type}/:id/:projection`, compose([...get_mware, CrudController.get(type)]));
    router.get(`${prefix}/${type}/:id`, compose([...get_mware, CrudController.get(type)]));
}

function generate_del_routes(router: KoaRouter, prefix: string, type: string, emiddlewares: Array<Function>) {
    const del_mware = del_middlewares(type);
    router.del(`${prefix}/${type}/:id`, compose([...del_mware, CrudController.del(type)]));
}

function generate_put_routes(router: KoaRouter, prefix: string, type: string, emiddlewares: Array<Function>) {
    const put_mware = put_middlewares(type, emiddlewares);
    router.put(`${prefix}/${type}`, compose([...put_mware, CrudController.put(type)]));
    router.put(`${prefix}/${type}/validate`, compose([...put_mware, CrudController.validate]));
    router.put(`${prefix}/${type}/validate/:range`, compose([...put_mware, CrudController.validate]));
}

function generate_post_routes(router: KoaRouter, prefix: string, type: string, emiddlewares: Array<Function>) {
    const post_mware = post_middlewares(type, emiddlewares);

    router.post(`${prefix}/${type}`, compose([...post_mware, CrudController.post(type)]));
    router.post(`${prefix}/${type}/validate`, compose([...post_mware, CrudController.validate]));
    router.post(`${prefix}/${type}/validate/:range`, compose([...post_mware, CrudController.validate]));
}

function generate_entity_routes(router: KoaRouter,
    type: string, emiddlewares: Array<Function>) {
    const puprefix = `${Config.api.public.prefix}/${Config.api.public.version}`;
    generate_gets_routes(router, puprefix, type, emiddlewares);
    generate_get_routes(router, puprefix, type, emiddlewares);
    generate_del_routes(router, puprefix, type, emiddlewares);
    generate_post_routes(router, puprefix, type, emiddlewares);
    generate_put_routes(router, puprefix, type, emiddlewares);
}

exports.generate_entity_routes = generate_entity_routes;
exports.generate_gets_routes = generate_gets_routes;
exports.generate_get_routes = generate_get_routes;
exports.generate_del_routes = generate_del_routes;
exports.generate_post_routes = generate_post_routes;
exports.generate_put_routes = generate_put_routes;
exports.koa_middlewares = koa_middlewares;
exports.api_middlewares = api_middlewares;
exports.app_middlewares = app_middlewares;
exports.get_middlewares = get_middlewares;
exports.del_middlewares = del_middlewares;
exports.post_middlewares = post_middlewares;
exports.put_middlewares = put_middlewares;
exports.upload_middlewares = upload_middlewares;
