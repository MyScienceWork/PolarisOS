const _ = require('lodash');
const StringUtils = require('../utils/strings');
const API = require('../api');
const APIRoutes = require('../api/routes');
const Messages = require('../api/messages');

async function create_or_update_or_validate(ctx, { path, body, form, rform, rpath }, action = 'create') {
    const method = action === 'update' ? 'PUT' : 'POST';

    const payload = {
        path,
        method,
        body,
        commit: ctx.commit,
    };

    ctx.commit(Messages.LOADING, { form });
    const response = await API.fetch(payload);
    ctx.commit(Messages.FETCH, { method, action, response, form, commit: ctx.commit });

    if (action !== 'validate') {
        ctx.dispatch('single_read', {
            form: rform,
            path: rpath,
        });
    }
}

module.exports = {
    create: async (ctx, payload) => {
        await create_or_update_or_validate(ctx, payload, 'create');
    },

    update: async (ctx, payload) => {
        await create_or_update_or_validate(ctx, payload, 'update');
    },

    validate: async (ctx, payload) => {
        await create_or_update_or_validate(ctx, payload, 'validate');
    },

    remove: async (ctx, { path, form, rpath, rform }) => {
        const payload = {
            path,
            method: 'DEL',
            commit: ctx.commit,
        };

        ctx.commit(Messages.LOADING, { form });
        const response = await API.fetch(payload);
        ctx.commit(Messages.FETCH, { method: 'DEL', response, form, action: 'delete', commit: ctx.commit });
        ctx.dispatch('single_read', {
            form: rform,
            path: rpath,
        });
    },

    single_read: async (ctx, { form, path }) => {
        const payload = {
            path,
            method: 'GET',
            commit: ctx.commit,
        };

        ctx.commit(Messages.LOADING, { form });
        const response = await API.fetch(payload);
        ctx.commit(Messages.FETCH, { method: 'GET', response, form, action: 'read', commit: ctx.commit });
    },

    search: async (ctx, { form, path, body }) => {
        const payload = {
            path,
            method: 'POST',
            commit: ctx.commit,
            body,
        };

        ctx.commit(Messages.LOADING, { form });
        const response = await API.fetch(payload);
        ctx.commit(Messages.FETCH, { method: 'GET', response, form, action: 'read', commit: ctx.commit });
    },

    grab_config: async (ctx, { path, body }) => {
        const payload = {
            path,
            method: 'POST',
            commit: ctx.commit,
            body,
        };

        const response = await API.fetch(payload);
        // const success = response.type === Messages.SUCCESS;
        if (response.content == null) {
            response.content = {};
        }

        console.log(response.content);

        const content = 'result' in response.content
            && 'hits' in response.content.result ? response.content.result.hits : [];
        if (content.length > 0) {
            ctx.state.global_config = content[0].source;
        }
    },

    grab_language: async (ctx, { path, body }) => {
        const payload = {
            path,
            method: 'POST',
            commit: ctx.commit,
            body,
        };

        const response = await API.fetch(payload);
        // const success = response.type === Messages.SUCCESS;
        if (response.content == null) {
            response.content = {};
        }

        const content = 'result' in response.content
            && 'hits' in response.content.result ? response.content.result.hits : [];
        ctx.state.lang_content = content.reduce((obj, src) => {
            const l = src.source;
            const lang = obj[l.lang] || {};
            lang[l.key] = l.values.reduce((values, v) => {
                values[v.quantity] = v.value;
                return values;
            }, {});
            obj[l.lang] = lang;
            return obj;
        }, {});
    },
};
