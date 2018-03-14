// @flow
const Errors = require('../../../exceptions/errors');

async function check_user(ctx: Object, next: Function): Promise<any> {
    if (!ctx.__md || !ctx.__md.papi || !ctx.__md.papi.id) {
        throw Errors.InvalidRoute;
    }

    const papi = ctx.__md.papi;
    const body = ctx.request.body;

    if (body._id !== papi.id) {
        throw Errors.InvalidRoute;
    }

    await next();
}

module.exports = {
    M: [],
    MyUserM: [check_user],
};
