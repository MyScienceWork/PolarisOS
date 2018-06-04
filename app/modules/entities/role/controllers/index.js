// @flow
module.exports = {};

const EntitiesUtils = require('../../../utils/entities');
const Crypto = require('crypto');
const Errors = require('../../../exceptions/errors');

async function authenticate(ctx: Object) {
    const body = ctx.request.body;
    const password = body.password;
    const email = body.email;

    // const hpassword = Crypto.createHash('sha1').update(password).digest('hex');

    const info = await EntitiesUtils.retrieve(email, 'user', '', '', { field: 'email' });

    if (info == null) {
        ctx.body = { ok: false, user: {} };
        return;
    }

    if (info.get('locked')) {
        throw Errors.AccountIsLocked;
    }

    let hpassword = `${info.get('salt')}_${password}_${info.get('salt')}`;

    hpassword = Crypto.createHash('sha1').update(hpassword).digest('hex');

    if (hpassword === info.get('hpassword')) {
        info.set('force_deconnection', false);
        await info.update();

        ctx.body = { ok: true,
            user: { firstname: info.get('firstname'),
                lastname: info.get('lastname'),
                email: info.get('email'),
                access: info.get('access'),
                key: info.get('key'),
                secret: info.get('secret'),
            } };
        return;
    }

    ctx.body = { ok: false, user: {} };
}

async function access(ctx: Object) {
    const body = ctx.request.body;
    const key = body.key || '';
    const part = body.part || '';
    const types = body.types || [];
    const check = body.check || 'all';

    if (key === '' || part === '' || types.length === 0) {
        ctx.body = { ok: false };
        return;
    }

    const user = await EntitiesUtils.retrieve(key, 'user', '', '', { field: 'key' });
    if (user == null) {
        ctx.body = { ok: false };
        return;
    }

    const papi = ctx.__fv.papi;

    if (papi == null || papi.name !== 'user'
        || papi.get('email') !== user.get('email')
        || papi.get('key') !== user.get('key')
        || papi.get('secret') !== user.get('secret')) {
        ctx.body = { ok: false };
        return;
    }

    if (user.get('locked')) {
        throw Errors.AccountIsLocked;
    }

    if (user.get('force_deconnection')) {
        ctx.body = { ok: false };
        return;
    }

    const myaccess = user.get('access.rights');

    if (!(part in myaccess)) {
        ctx.body = { ok: false };
        return;
    }

    const existing_types = types.filter(t => myaccess[part][t]);
    if (existing_types.length === 0) {
        ctx.body = { ok: false };
        return;
    }
    if (check === 'all' && existing_types.length !== types.length) {
        ctx.body = { ok: false };
        return;
    }
    ctx.body = { ok: true };
}

module.exports = {
    authenticate,
    access,
};
