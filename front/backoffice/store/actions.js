const API = require('../api');
const APIRoutes = require('../api/routes');
const Messages = require('../api/messages');
const StringUtils = require('../utils/strings');

module.exports = {
    call_api: async (ctx, { path, method, body }) => {
        const payload = {
            path,
            method,
            body,
            commit: ctx.commit,
        };

        const response = await API.fetch(payload);
        ctx.commit(Messages.FETCH, response);
    },
};
