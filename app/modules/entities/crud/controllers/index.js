// @flow
const Errors = require('../../../exceptions/errors');
const EntitiesUtils = require('../../../utils/entities');
const WebUtils = require('../../../utils/web');
const Logger = require('../../../../logger');

function count(type: string): Function {
    return async function func(ctx: Object) {
        const body = ctx.request.body;
        ctx.body = await EntitiesUtils.count(type, body);
    };
}

function search(type: string): Function {
    return async function func(ctx: Object) {
        const body = ctx.request.body;
        const params = ctx.params;

        let translatable = false;
        let lang = 'EN';
        if ('translatable' in params) {
            translatable = params.translatable === 'true';
        }

        if (translatable && 'lang' in params) {
            lang = params.lang.trim();
        }

        ctx.body = await EntitiesUtils.search(type, body, translatable, lang);
    };
}

function gets(type: string): Function {
    return async function func(ctx: Object) {
        if (!('scroll' in ctx.request.body)) {
            ctx.request.body.scroll = '10m';
        }

        const proj = ctx.params.projection || '';
        const pop = ctx.params.population || '';

        if (proj.trim() !== '') {
            ctx.request.body.projection = proj.trim().split(',').filter(p => p != null && p !== '');
            if (ctx.request.body.projection.length === 0) {
                ctx.request.body.projection = true;
            }
        }

        if (pop.trim() !== '') {
            ctx.request.body.population = pop.trim().split(',').filter(p => p != null && p !== '');
        }

        await search(type)(ctx);
    };
}

function get(type: string, exists: boolean = false): Function {
    return async function func(ctx: Object): Promise<*> {
        const id = ctx.params.id;
        const proj = ctx.params.projection || '';
        const pop = ctx.params.population || '';
        const entity = await EntitiesUtils.retrieve(id, type, proj, pop);

        if (entity == null) {
            if (exists) {
                ctx.body = { exists: false };
                return;
            }
            throw Errors.InvalidEntity;
        }
        if (exists) {
            ctx.body = { exists: entity.found };
        } else {
            ctx.body = entity.source;
        }
    };
}

function put_with_action(type: string, action: Function, options: Object): Function {
    return async function func(ctx: Object): Promise<*> {
        const obj = await EntitiesUtils.update(ctx.request.body, type);
        if (obj == null) {
            throw Errors.UnableToCreateEntity;
        }

        if (!options) {
            options = {};
        }
        options.__md = ctx.__md;
        await action(obj, options);
        ctx.body = WebUtils.forge_ok_response(obj, 'put');
    };
}

function put(type: string): Function {
    return put_with_action(type, async () => {}, {});
}

function del(type: string): Function {
    return async function func(ctx: Object): Promise<*> {
        let right_enforcer = null;
        if (ctx.__md != null) {
            right_enforcer = ctx.__md.right_enforcer;
        }

        const id = ctx.params.id;
        let obj = null;
        let odm = null;

        // if (right_enforcer == null) {
        [odm, obj] = await EntitiesUtils.remove(id, type);
        if (obj == null) {
            throw Errors.InvalidEntity;
        }
            /* } else if (right_enforcer.has_right()) {
            [odm, obj] = await EntitiesUtils.remove(id, type);
        } else {
            throw Errors.InvalidEntity;
            }*/
        ctx.body = WebUtils.forge_ok_response(odm, 'delete');
    };
}

async function validate(ctx: Object): Promise<*> {
    console.log(JSON.stringify(ctx.request.body));
    ctx.body = ctx.request.body;
}

function post_with_action(type: string, action: Function, options: Object): Function {
    return async function func(ctx: Object): Promise<*> {
        const obj = await EntitiesUtils.create(ctx.request.body, type);
        if (obj == null) {
            throw Errors.UnableToCreateEntity;
        }

        if (!options) {
            options = {};
        }
        options.__md = ctx.__md;
        await action(obj, options);
        ctx.body = WebUtils.forge_ok_response(obj, 'post');
    };
}

function post(type: string): Function {
    return post_with_action(type, async () => {}, {});
}

function bulk_post_with_action(type: string, action: Function, options: Object): Function {
    return async function func(ctx: Object): Promise<*> {
        const items = ctx.request.body;
        const res = { total: 0, success: 0, errors_count: 0, results: [] };
        const results = [];
        for (const chunk of items) {
            res.total += chunk.length;
            if ('change' in chunk[0] || chunk[0].error) {
                results.push(chunk);
                res.errors_count += chunk.length;
            } else {
                const response = await EntitiesUtils.creates(chunk, type);
                if (response.errors) {
                    response.items.forEach((item) => {
                        if (!item.index.created) {
                            res.errors_count += 1;
                        }
                    });
                }
                results.push(response.items);
            }
        }

        res.results = results;
        res.success = res.total - res.errors_count;
        ctx.body = res;
    };
}

function bulk_put_with_action(type: string, action: Function, options: Object): Function {
    return async function func(ctx: Object): Promise<*> {
        const items = ctx.request.body;
        const res = { total: 0, success: 0, errors_count: 0, results: [] };
        const results = [];
        for (const chunk of items) {
            res.total += chunk.length;
            if ('change' in chunk[0] || chunk[0].error) {
                results.push(chunk);
                res.errors_count += chunk.length;
            } else {
                const response = await EntitiesUtils.updates(chunk, type);
                if (response.errors) {
                    response.items.forEach((item) => {
                        if ('error' in item.update) {
                            res.errors_count += 1;
                        }
                    });
                }
                results.push(response.items);
            }
        }

        res.results = results;
        res.success = res.total - res.errors_count;
        ctx.body = res;
    };
}

module.exports = {
    gets,
    get,
    put,
    put_with_action,
    del,
    post,
    post_with_action,
    count,
    search,
    validate,
    bulk_post_with_action,
    bulk_put_with_action,
};
