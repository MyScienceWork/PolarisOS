const _ = require('lodash');
const Messages = require('../api/messages');
const StringUtils = require('../utils/strings');
const EventType = require('../enums/event_types');

module.exports = {
    [Messages.LOADING]: (state) => {
        state.loading = true;
        state.success = false;
        state.content = [];
    },

    [Messages.FETCH]: (state, payload) => {
        state.success = payload.type === Messages.SUCCESS;
        if (payload.content == null) {
            payload.content = [];
        }

        if (state.success) {
            state.content = payload.content instanceof Array ? payload.content
                : [payload.content];
        } else {
            state.content = payload.content;
        }
        state.loading = false;
    },

    [Messages.ERROR]: (state, payload) => {
        state.error = true;
        state.error_type = payload.error_type;
    },
};
