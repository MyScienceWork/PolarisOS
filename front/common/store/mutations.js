const _ = require('lodash');
const Messages = require('../api/messages');
const Utils = require('../utils/utils');

function create_form() {
    return {
        pool: 0,
        claims: 0,
        validations: {},
        error: {},
        loading: false,
        update: false,
        reclaim: false,
        cancel: false,
        partial: false,
        validate: false,
        success: '',
        content: [],
    };
}

module.exports = {
    [Messages.LOADING]: (state, payload) => {
        const form_name = payload.form;
        if (form_name in state.forms) {
            state.forms[form_name].loading = true;
        }
    },

    [Messages.FETCH]: (state, payload) => {
        const success = payload.response.type === Messages.SUCCESS;
        const form_name = payload.form;

        if (payload.response.content == null) {
            payload.response.content = [];
        }

        if (!(form_name in state.forms)) {
            state.forms = Object.assign({}, state.forms, { [form_name]: create_form() });
        }

        state.forms[form_name].loading = false;
        state.forms[form_name].claims = 0;
        state.forms[form_name].update = false;
        state.forms[form_name].reclaim = false;
        state.forms[form_name].partial = false;
        state.forms[form_name].validate = false;
        state.forms[form_name].cancel = false;
        state.forms[form_name].validations = {};

        if (success) {
            if (payload.method === 'GET') {
                const content = payload.response.content;
                if ('result' in content && 'hits' in content.result) {
                    state.forms[form_name].content = content.result.hits.map(hit => _.merge({ _id: hit.id }, hit.source));
                } else {
                    state.forms[form_name].content = content;
                }
            } else if ('change' in payload.response.content
                            && payload.response.content.change === 'Validation') {
                state.forms[form_name].validations = Object.assign({}, payload.response.content.errors);
            } else {
                state.forms[form_name].success = payload.response.content.message;
                state.forms[form_name].cancel = true;
            }
            state.forms[form_name].error = {};
        } else if (form_name in state.forms) {
            state.forms[form_name].error = Object.assign({}, {
                found: true, content: payload.response.content,
            });
            state.forms[form_name].validations = {};
        }
    },

    [Messages.ERROR]: (state, payload) => {
        state.error = true;
        state.error_type = payload.error_type;
    },

    [Messages.CREATE_FORM]: (state, payload) => {
        const form_name = payload.form;
        const content = payload.content || {};
        state.forms = Object.assign({}, state.forms, {
            [form_name]: create_form(),
        });
        state.forms[form_name].content = content;
    },

    [Messages.REMOVE_FORM]: (state, payload) => {
        const form_name = payload.form;
        if (form_name in state.forms) {
            delete state.forms[form_name];
        }
    },

    [Messages.CANCEL_FORM]: (state, payload) => {
        const form_name = payload.form;
        if (form_name in state.forms) {
            state.forms[form_name].cancel = true;
            state.forms[form_name].update = false;
            state.forms[form_name].partial = false;
            state.forms[form_name].validate = false;
            state.forms[form_name].content = {};
            state.forms[form_name].error = {};
            state.forms[form_name].claims = 0;
            state.forms[form_name].success = '';
            state.forms[form_name].validations = {};
        }
    },

    [Messages.REMOVE_ALL_FORMS]: (state) => {
        state.forms = {};
    },

    [Messages.UPDATE_MODE_FORM]: (state, payload) => {
        const form_name = payload.form;
        if (form_name in state.forms) {
            state.forms[form_name].update = payload.update || false;
            state.forms[form_name].cancel = false;
            state.forms[form_name].partial = false;
            state.forms[form_name].validate = false;
            state.forms[form_name].content = Object.assign({}, payload.content || {});
            state.forms[form_name].error = {};
            state.forms[form_name].success = '';
            state.forms[form_name].validations = {};
        }
    },

    [Messages.TOGGLE_RECLAIM_FORM]: (state, payload) => {
        const form_name = payload.form;
        if (form_name in state.forms) {
            state.forms[form_name].reclaim = 'reclaim' in payload ?
                payload.reclaim : !state.forms[form_name].reclaim;
            state.forms[form_name].cancel = false;
            state.forms[form_name].partial = 'partial' in payload ? payload.partial : false;
            state.forms[form_name].validate = 'validate' in payload ? payload.validate : false;
            state.forms[form_name].error = {};
        }
    },

    [Messages.RECLAIM_FORM_ELEMENT]: (state, payload) => {
        const form_name = payload.form;
        const name = payload.name;
        const info = payload.info;
        if (form_name in state.forms) {
            const path = name.split('.');
            const content = state.forms[form_name].content;
            const object = Utils.make_nested_object_from_path(path, info);
            state.forms[form_name].content = Utils.merge_with_replacement(content, object);
            state.forms[form_name].claims += 1;
        }
    },

    [Messages.ADD_TO_FORM_POOL]: (state, payload) => {
        const form_name = payload.form;
        if (form_name in state.forms) {
            state.forms[form_name].pool += 1;
        }
    },

    [Messages.REMOVE_FROM_FORM_POOL]: (state, payload) => {
        const form_name = payload.form;
        const elt_name = payload.name;
        if (form_name in state.forms) {
            state.forms[form_name].pool -= 1;

            const path = elt_name.split('.');
            const last = path[path.length - 1];
            const object = Utils.find_object_with_path(state.forms[form_name].content, path);
            if (object) {
                delete object[last];
            }
        }
    },
};
