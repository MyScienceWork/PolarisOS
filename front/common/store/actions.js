const _ = require('lodash');
const API = require('../api');
const APIRoutes = require('../api/routes');
const Messages = require('../api/messages');

async function create_or_update(ctx, { path, body, form, rform, rpath }, up = false) {
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
    ctx.dispatch('single_read', {
        form: rform,
        path: rpath,
    });
}

module.exports = {
    create: async (ctx, payload) => {
        await create_or_update(ctx, payload, false);
    },

    update: async (ctx, payload) => {
        await create_or_update(ctx, payload, true);
    },

    remove: async (ctx, { path, form, rpath, rform }) => {
        const payload = {
            path,
            method: 'DEL',
            commit: ctx.commit,
        };

        ctx.commit(Messages.LOADING, { form });
        const response = await API.fetch(payload);
        ctx.commit(Messages.FETCH, { method: 'DEL', response, form });
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
        ctx.commit(Messages.FETCH, { method: 'GET', response, form });
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
        ctx.commit(Messages.FETCH, { method: 'GET', response, form });
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

    grab_datasources: async (ctx, { datasources }) => {
        const payloads = _.map(datasources, (ds, name) => {
            if (name.startsWith(ctx.state.global_config.datasources.prefix)) {
                return {
                    name,
                    path: APIRoutes.entity('datainstance', 'POST', true),
                    method: 'POST',
                    commit: ctx.commit,
                    body: {
                        size: 10000,
                        where: {
                            type: name,
                        },
                        projection: [ds.label, ds.value],
                    },
                };
            } else if (name.startsWith(ctx.state.global_config.keystores.prefix)) {
                return {
                    name,
                    path: APIRoutes.entity('keystore', 'POST', true),
                    method: 'POST',
                    commit: ctx.commit,
                    body: {
                        size: 10000,
                        where: {
                            type: name,
                        },
                        projection: [ds.label, ds.value],
                    },
                };
            }
            return {
                name,
                path: APIRoutes.entity(name, 'POST', true),
                method: 'POST',
                commit: ctx.commit,
                body: {
                    size: 10000,
                    projection: [ds.label, ds.value],
                },
            };
        });

        const responses = await Promise.all(payloads.map(payload => API.fetch(payload)));

        ctx.state.datasources = payloads.reduce((obj, payload, i) => {
            obj[payload.name] = [];
            const response = responses[i];
            if ('result' in response.content && 'hits' in response.content.result) {
                obj[payload.name] = response.content.result.hits.map(hit => hit.source);
            }
            return obj;
        }, {});
    },
};
