// @flow
const Errors = require('../../../exceptions/errors');
const EntitiesUtils = require('../../../utils/entities');
const WebUtils = require('../../../utils/web');

function count(type: string): Function {
    return async function func(ctx: Object) {
        const body = ctx.request.body;
        ctx.body = await EntitiesUtils.count(type, body);
    };
}

function search(type: string): Function {
    return async function func(ctx: Object) {
        const body = ctx.request.body;
        /* if (!('scroll' in body)) {
            body.scroll = '10m';
        }*/
        ctx.body = await EntitiesUtils.search(type, body);
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
    ctx.body = ctx.request.body;
}

function post_with_action(type: string, action: Function, options: Object): Function {
    return async function func(ctx: Object): Promise<*> {
        const obj = await EntitiesUtils.create(ctx.request.body, type);
        if (obj == null) {
            throw Errors.UnableToCreateEntity;
        }

        await action(obj, options);
        ctx.body = WebUtils.forge_ok_response(obj, 'post');
    };
}

function post(type: string): Function {
    return post_with_action(type, async () => {}, {});
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
};
