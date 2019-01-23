const ms = require('ms');

function merge(...args) {
    const merged = Object.assign({}, ...args);
    if (typeof merged.ttl === 'string') {
        merged.ttl = ms(merged.ttl);
    }
    return merged;
}

function create(cfg) {
    let config = cfg || {
        ttl: 60000,
        key: ctx => ctx && ctx.request && ctx.request.href,
        storage: null,
        entity: '',
    };

    function cache(opts) {
        const options = merge(config, opts || {});

        return async function middleware(ctx, next) {
            const key = options.key(ctx, 'use');
            const cached = await options.storage.get(key);

            if (cached) {
                ctx.response.body = cached;
                return;
            }

            await next();
            if (ctx && ctx.response && ctx.response.body) {
                await options.storage.set(key, ctx.response.body, options.ttl, options.entity);
            }
        };
    }

    cache.use = cache;

    cache.config = function (opts = {}) {
        config = merge(config, opts);
        return config;
    };

    cache.clear = async function (opts) {
        const options = merge(config, opts || {});
        await options.storage.clear(options.entity);
    };

    return cache;
}

const cache = create();
module.exports = cache;
module.exports.create = create;
module.exports.default = module.exports;
