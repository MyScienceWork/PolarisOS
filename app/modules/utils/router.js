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
        Pipeline.check(type),
        Pipeline.merge(type),
        Pipeline.defaults(type),
        Pipeline.format(type),
        Pipeline.complete(type),
        Pipeline.format(type),
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
    const upload = Multer({ dest });
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


function generate_entity_routes(router: KoaRouter,
    type: string, emiddlewares: Array<Function>) {
    const puprefix = `${Config.api.public.prefix}/${Config.api.public.version}`;

    const get_mware = get_middlewares(type);
    const del_mware = del_middlewares(type);
    const put_mware = put_middlewares(type, emiddlewares);
    const post_mware = post_middlewares(type, emiddlewares);

    router.get(`${puprefix}/${type}s/count`, compose([...get_mware, CrudController.count(type)]));

    router.post(`${puprefix}/${type}s/count`, compose([...get_mware, CrudController.count(type)]));

    router.post(`${puprefix}/${type}s/search`, compose([...get_mware, CrudController.search(type)]));

    router.get(`${puprefix}/${type}s/:projection/:population`, compose([...get_mware, CrudController.gets(type)]));
    router.get(`${puprefix}/${type}s/:projection`, compose([...get_mware, CrudController.gets(type)]));
    router.get(`${puprefix}/${type}s`, compose([...get_mware, CrudController.gets(type)]));

    router.post(`${puprefix}/${type}s/:projection/:population`, compose([...get_mware, CrudController.gets(type)]));
    router.post(`${puprefix}/${type}s/:projection`, compose([...get_mware, CrudController.gets(type)]));
    router.post(`${puprefix}/${type}s`, compose([...get_mware, CrudController.gets(type)]));

    router.get(`${puprefix}/${type}/exists/:id`, compose([...get_mware, CrudController.get(type, true)]));

    router.get(`${puprefix}/${type}/:id/:projection/:population`, compose([...get_mware, CrudController.get(type)]));
    router.get(`${puprefix}/${type}/:id/:projection`, compose([...get_mware, CrudController.get(type)]));
    router.get(`${puprefix}/${type}/:id`, compose([...get_mware, CrudController.get(type)]));


    router.del(`${puprefix}/${type}/:id`, compose([...del_mware, CrudController.del(type)]));
    router.put(`${puprefix}/${type}`, compose([...put_mware, CrudController.put(type)]));
    router.post(`${puprefix}/${type}`, compose([...post_mware, CrudController.post(type)]));
    router.put(`${puprefix}/${type}/validate`, compose([...put_mware, CrudController.validate]));
    router.post(`${puprefix}/${type}/validate`, compose([...post_mware, CrudController.validate]));
}

exports.generate_entity_routes = generate_entity_routes;
exports.koa_middlewares = koa_middlewares;
exports.api_middlewares = api_middlewares;
exports.app_middlewares = app_middlewares;
exports.get_middlewares = get_middlewares;
exports.del_middlewares = del_middlewares;
exports.post_middlewares = post_middlewares;
exports.put_middlewares = put_middlewares;
exports.upload_middlewares = upload_middlewares;
