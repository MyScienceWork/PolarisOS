const API = require('../api');
const Messages = require('../api/messages');

async function create_or_update(ctx, { path, body, form }, up = false) {
    const method = up ? 'PUT' : 'POST';
    const payload = {
        path,
        method,
        body,
        commit: ctx.commit,
    };

    ctx.commit(Messages.LOADING, { form });
    const response = await API.fetch(payload);
    ctx.commit(Messages.FETCH, { method, response, form });
}

module.exports = {
    create: async (ctx, payload) => {
        await create_or_update(ctx, payload, false);
    },

    update: async (ctx, payload) => {
        await create_or_update(ctx, payload, true);
    },

    remove: async (ctx, { path, form }) => {
        const payload = {
            path,
            method: 'DEL',
            commit: ctx.commit,
        };

        ctx.commit(Messages.LOADING, { form });
        const response = await API.fetch(payload);
        ctx.commit(Messages.FETCH, { method: 'DEL', response, form });
    },

    single_read: async (ctx, { form, path }) => {
        const payload = {
            path,
            method: 'GET',
            commit: ctx.commit,
        };

        ctx.commit(Messages.LOADING, { form });
        const response = await API.fetch(payload);
        ctx.commit(Messages.FETCH, { method: 'GET', response, form });
    },
};
