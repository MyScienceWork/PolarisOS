// @flow
module.exports = {};

const Errors = require('../exceptions/errors');
const RightEnforcer = require('./right_enforcer');
const ODM = require('../entities/crud/odm');
const EntitiesUtils = require('../utils/entities');

function access(entity_name: string, a: string): Function {
    return async function func(ctx: Object, next: Function): Promise<*> {
        if (!('__md' in ctx)) {
            return await next();
        }

        const info = ctx.__md.papi;
        switch (info.type) {
        case 'device':
            ctx.__md.right_enforce = false;
            return await next();
        case 'user':
        case 'papi':
        default:
            if (info.get(`access.rights.${entity_name}.${a}`)) {
                const id = ctx.request.body._id || ctx.params.id;
                ctx.__md.right_enforce = true;
                if (id != null) {
                    const entity = await EntitiesUtils.retrieve(id, entity_name);
                    if (entity == null) {
                        throw Errors.InvalidEntity;
                    } else {
                        ctx.__md.entity = entity;
                        return await next();
                    }
                } else if (id == null && ctx.request.method === 'PUT') {
                    throw Errors.InvalidEntity;
                } else {
                    ctx.__md.entity = EntitiesUtils.get_info_from_type(entity_name);
                }
                return await next();
            }
            throw Errors.InvalidRoute;
        }
    };
}

async function enforce_right(ctx: Object, next: Function): Promise<*> {
    if (!('__md' in ctx)) {
        return await next();
    }

    const entity: ODM = ctx.__md.entity;
    const user: ODM = ctx.__md.papi;

    if (ctx.__md.right_enforce === false) {
        return await next();
    }
    ctx.__md.right_enforcer = new RightEnforcer(entity, user);
    return await next();
}


module.exports.access = access;
module.exports.enforce_right = enforce_right;
