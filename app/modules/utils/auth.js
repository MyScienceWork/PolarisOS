const CAS = require('cas');

const cas = new CAS({
    base_url: 'https://sceau.ined.fr',
    service: 'http://localhost:4002/api/public/v2/login/cas',
    version: 2.0,
});

async function cas_sso(ctx, next) {
    const tickets = ctx.query.ticket;
    console.log(ctx.params, ctx.query, tickets);

    if (tickets && tickets.length > 0) {
        console.log('ok tickets');
        const promise = new Promise((resolve, reject) => {
            cas.validate(tickets[0], (err, status, username, extended) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ username, status, extended });
            });
        });
        try {
            const info = await promise;
            if (!('status' in info) || !('username' in info)) {
                ctx.body = { login: false, info: {} };
                return;
            }

            if (info.status) {
                ctx.body = { login: true, info };
            } else {
                ctx.body = { login: info.status, info, reason: 'InvalidCredentials' };
            }
        } catch (err) {
            console.log(err);
            ctx.body = { login: false, reason: 'ErrorInValidation' };
        }
        return;
    }

    ctx.body = { login: false, reason: 'NoTicket' };
}

module.exports = {
    cas_sso,
};
