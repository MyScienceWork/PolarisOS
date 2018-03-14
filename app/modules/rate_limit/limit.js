// @flow
const Errors = require('../exceptions/errors');
const RateLimiter = require('./rate_limit');

const limit = new RateLimiter({
    // store: new MongoRateStore(60 * 1000, ApiUserModel.Model),
    windowMs: 60 * 1000,
    delayAfter: 0,
    delayMs: 0,
    max: 10 * 60, // 1 per sec
    headers: true,
    /* keyGenerator(ctx) {
        return ctx.__fv.papi.get('key');
        },*/
    handler() {
        throw Errors.RateLimitExceeded;
    },
});

module.exports = limit;
