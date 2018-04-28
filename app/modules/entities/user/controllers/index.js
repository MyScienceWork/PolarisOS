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

    const sources = await EntitiesUtils.search_and_get_sources('user', {
        where: {
            'emails.email': email,
        },
        size: 1,
        population: ['roles._id'],
    });

    if (sources.length === 0) {
        ctx.body = { ok: false, user: {} };
        return;
    }

    const db = sources[0];

    if (db.locked) {
        throw Errors.AccountIsLocked;
    }

    // let hpassword = `${info.get('salt')}_${password}_${info.get('salt')}`;

    const hpassword = Crypto.createHash('sha1').update(password).digest('hex');

    if (hpassword === db.password) {
        // info.set('force_deconnection', false);
        // await info.update();

        ctx.body = { ok: true,
            user: db };
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

    const info = await EntitiesUtils.search('user', {
        where: {
            'authentication.key': key,
        },
        population: ['roles._id'],
    });

    if (info == null || info.result == null ||
        info.result.hits.length === 0) {
        ctx.body = { ok: false };
        return;
    }

    const user = info.result.hits[0].source;
    const papi = ctx.__md.papi;

    if (papi == null || papi.authentication.key !== user.authentication.key
        || papi.authentication.secret !== user.authentication.secret) {
        ctx.body = { ok: false };
        return;
    }

    if (user.locked) {
        throw Errors.AccountIsLocked;
    }

    // TODO
    // Reimplement later
    /* if (user.force_deconnection) {
        ctx.body = { ok: false };
        return;
    }*/

    const roles = user.roles;

    let role = roles.reduce((obj, _role) => {
        const rights = _role._id.rights;
        if (Object.keys(obj).length === 0) {
            return rights;
        }

        for (const right of rights) {
            for (const fright of obj) {
                if (fright.entity !== right.entity) {
                    continue;
                }

                if (right.c === true) {
                    fright.c = true;
                }

                if (right.r === true) {
                    fright.r = true;
                }

                if (right.u === true) {
                    fright.u = true;
                }

                if (right.d === true) {
                    fright.d = true;
                }
            }
        }
        return obj;
    }, {});

    role = role.reduce((obj, _role) => {
        obj[_role.entity] = _role;
        return obj;
    }, {});

    if (!(part in role)) {
        ctx.body = { ok: false };
        return;
    }

    const existing_types = types.filter(t => role[part][t]);
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
