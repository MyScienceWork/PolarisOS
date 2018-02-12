// @flow
const MemoryStore = require('./memory_store');
const _ = require('lodash');

class RateLimiter {
    options: Object;

    constructor(options: Object) {
        this.options = _.defaults(options, {
            // window, delay, and max apply per-key unless global is set to true
            windowMs: 60 * 1000, // milliseconds - how long to keep records of requests in memory
            delayAfter: 1, // how many requests to allow through before starting to delay responses
            delayMs: 1000, // milliseconds - base delay applied to the response - multiplied by number of recent hits for the same key.
            max: 30, // max number of recent connections during `window` milliseconds before sending a 429 response
            message: 'Too many requests, please try again later.',
            statusCode: 429, // 429 status = Too Many Requests (RFC 6585)
            headers: true, // Send custom rate limit header with limit and remaining
            // allows to create custom keys (by default user IP is used)
            keyGenerator(ctx: Object): string {
                return ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
            },
            handler() {
                throw Error('Rate Limit Exceeded');
            },
        });

        // store to use for persisting rate limit data
        this.options.store = this.options.store || new MemoryStore(this.options.windowMs, this.options.max);

        // ensure that the store has the incr method
        if (typeof this.options.store.incr !== 'function'
            || typeof this.options.store.resetKey !== 'function') {
            throw new Error('The store is not valid.');
        }
    }

    limit(): Function {
        const self = this;
        return async function func(ctx: Object, next: Function): Promise<*> {
            const key: string = self.options.keyGenerator(ctx);
            const [current, user_max] = await self.options.store.incr(key);
            const limit: number = user_max > self.options.max ? user_max : self.options.max;
            const remaining: number = Math.max(limit - current, 0);

            if (self.options.headers) {
                ctx.request.headers['X-RateLimit-Limit'] = limit;
                ctx.request.headers['X-RateLimit-Remaining'] = remaining;
            }

            if (limit && current > limit) {
                self.options.handler();
                return;
            }

            if (self.options.delayAfter && self.options.delayMs
            && current > self.options.delayAfter) {
                // const delay = (current - this.options.delayAfter) *
                // this.options.delayMs;
                // setTimeout(next, delay);
                await next();
                return;
            }

            await next();
        };
    }
}

module.exports = RateLimiter;
