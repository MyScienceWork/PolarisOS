const Vue = require('vue');
const _ = require('lodash');
const Messages = require('../api/messages');
const Utils = require('../utils/utils');

function create_form_if_needed(state, name) {
    if (!(name in state.forms)) {
        state.forms = Object.assign({}, state.forms, { [name]: {
            elements: {},
            claims: {},
            validations: {},
            error: {},
            state: 'initial',
            success: '',
            content: {},
            total: 0,
        } });
    }
}

module.exports = {
    [Messages.INITIALIZE]: (state, payload) => {
        const form_name = payload.form;
        const keep_content = payload.keep_content;
        create_form_if_needed(state, form_name);

        state.forms[form_name].state = 'initial';
        state.forms[form_name].claims = {};
        state.forms[form_name].validations = {};
        state.forms[form_name].error = {};
        state.forms[form_name].success = '';
        if (!keep_content) {
            state.forms[form_name].content = {};
        }
    },

    [Messages.LOADING]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);
        state.forms[form_name].state = 'loading';
    },

    [Messages.READ]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);
        state.forms[form_name].state = 'noop'; // In case of multiple updates...
        Vue.nextTick(() => {
            state.forms[form_name].content = payload.content;
            state.forms[form_name].state = 'update';
        });
    },

    [Messages.NOOP]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);
        state.forms[form_name].state = 'noop';
    },

    [Messages.FORCE_COMPLETION]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);
        state.forms[form_name].state = 'completed';
    },

    [Messages.COMPLETE_FORM_ELEMENT]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);

        const name = payload.name;
        const info = payload.info;
        const form = state.forms[form_name];

        const path = name.split('.');
        const content = state.forms[form_name].content;
        const object = Utils.make_nested_object_from_path(path, info);
        form.content = Utils.merge_with_replacement(content, object);
        const claims = state.forms[form_name].claims;
        form.claims = Object.assign({}, claims, { [payload.name]: 1 });


        const intersection = Object.keys(form.claims).filter(x => x in form.elements);
        const difference = Object.keys(form.elements).filter(x => !(x in form.claims));
        if (intersection.length === Object.keys(form.elements).length && intersection.length > 0) {
            Vue.nextTick(() => {
                form.state = 'completed';
            });
        }
    },

    [Messages.REMOVE_FORM_ELEMENT]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);

        const segs = payload.name.split('.');
        const form = state.forms[form_name];
        form.content = Object.assign({}, Utils.traverse_and_execute(
                    form.content, segs, () => undefined));
    },

    [Messages.COLLECT]: (state, payload) => {
        const form_name = payload.form;
        const remove_content = payload.remove_content;
        create_form_if_needed(state, form_name);
        state.forms[form_name].state = 'collect';
        state.forms[form_name].claims = {};
        if (remove_content) {
            state.forms[form_name].content = {};
        }
    },

    [Messages.COMPLETED]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);
        state.forms[form_name].state = 'completed';
        state.forms[form_name].claims = {};
    },

    [Messages.SUCCESS]: (state, payload) => {
        const form_name = payload.form;
        const type = payload.type;
        create_form_if_needed(state, form_name);

        state.forms[form_name].state = `success_${type}`;
        state.forms[form_name].validations = {};
        state.forms[form_name].error = {};
        state.forms[form_name].claims = {};
    },

    [Messages.ERROR]: (state, payload) => {
        const form_name = payload.form;
        const type = payload.type;
        create_form_if_needed(state, form_name);
        state.forms[form_name].state = `error_${type}`;

        if (type === 'validate') {
            state.forms[form_name].error = {};
        } else {
            state.forms[form_name].validations = {};
        }
        state.forms[form_name].claims = {};
        state.forms[form_name].success = '';
    },

    [Messages.FETCH]: (state, payload) => {
        const form_name = payload.form;
        const { action, succeeded, data, total, validations, success, error, content } = payload;
        create_form_if_needed(state, form_name);

        if (succeeded) {
            if (action === 'read') {
                state.forms[form_name].content = data;
                state.forms[form_name].total = total;
                payload.commit(Messages.SUCCESS, { type: action, form: form_name });
            } else if ('change' in content
                    && content.change === 'Validation') {
                state.forms[form_name].validations = validations;
                payload.commit(Messages.ERROR, { type: 'validate', form: form_name });
            } else if (action === 'validate') {
                state.forms[form_name].content = content;
                payload.commit(Messages.SUCCESS, { type: 'validate', form: form_name });
            } else if (action === 'delete') {
                // Noop
            } else {
                state.forms[form_name].success = success;
                payload.commit(Messages.SUCCESS, { type: 'create', form: form_name });
            }
        } else if (form_name in state.forms) {
            state.forms[form_name].error = error;
            payload.commit(Messages.ERROR, { type: 'generic', form: form_name });
        }
    },

    [Messages.REMOVE_FORM]: (state, payload) => {
        const form_name = payload.form;
        if (form_name in state.forms) {
            delete state.forms[form_name];
        }
    },

    [Messages.REMOVE_ALL_FORMS]: (state) => {
        state.forms = {};
    },

    [Messages.REGISTER_FORM_ELEMENT]: (state, payload) => {
        const form_name = payload.form;
        const name = payload.name;

        if (!name || name.trim() === '') {
            return;
        }

        create_form_if_needed(state, form_name);
        const pool = state.forms[form_name].elements;
        state.forms[form_name].elements = Object.assign({}, pool, { [name]: 1 });
    },

    [Messages.UNREGISTER_FORM_ELEMENT]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);

        if (payload.pattern) {
            const all_matched = _.filter(state.forms[form_name].elements,
                    (val, key) => key.indexOf(payload.name) !== -1);
            all_matched.forEach((m) => {
                delete state.forms[form_name].elements[m];
            });
        } else {
            delete state.forms[form_name].elements[payload.name];
        }
    },


    [Messages.LOGIN_PASS]: (state, payload) => {
        const status = payload.status;
        state.login_status = status || 'fail';
    },

    [Messages.SET_PAGES]: (state, payload) => {
        state.interface.pages = payload.pages;
    },

    [Messages.TRANSFERT_INTO_FORM]: (state, payload) => {
        const form_name = payload.form;
        const object = payload.body;
        create_form_if_needed(state, form_name);
        const form = state.forms[form_name];
        form.state = 'transfer';
        Vue.nextTick(() => {
            if (object === undefined) {
                form.content = {};
            } else {
                form.content = Utils.merge_with_replacement(form.content, object);
            }
            form.state = 'initial';
        });
    },
};
