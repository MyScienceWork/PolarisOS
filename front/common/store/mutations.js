const _ = require('lodash');
const Messages = require('../api/messages');
const Utils = require('../utils/utils');

function create_form_if_needed(state, name) {
    if (!(name in state.forms)) {
        state.forms = Object.assign({ [name]: {
            elements: {},
            claims: {},
            validations: {},
            error: {},
            state: 'initial',
            success: '',
            content: {},
        } }, state.forms);
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
            state.forms[form_name].content = [];
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
        state.forms[form_name].content = payload.content;
        state.forms[form_name].state = 'update';
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
        console.log('form content', form.content);
        const claims = state.forms[form_name].claims;
        form.claims = Object.assign({}, claims, { [payload.name]: 1 });


        const intersection = Object.keys(form.claims).filter(x => x in form.elements);
        if (intersection.length === Object.keys(form.elements).length && intersection.length > 0) {
            form.state = 'completed';
        }
    },

    [Messages.COLLECT]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);
        state.forms[form_name].state = 'collect';
    },

    [Messages.COMPLETED]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);
        state.forms[form_name].state = 'completed';
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
        const success = payload.response.type === Messages.SUCCESS;
        const form_name = payload.form;
        const action = payload.action;
        create_form_if_needed(state, form_name);

        if (payload.response.content == null) {
            payload.response.content = [];
        }


        if (success) {
            if (payload.action === 'read') {
                const content = payload.response.content;
                if ('result' in content && 'hits' in content.result) {
                    state.forms[form_name].content = content.result.hits.map(hit => hit.source);
                } else {
                    state.forms[form_name].content = content;
                }
                payload.commit(Messages.SUCCESS, { type: action, form: form_name });
            } else if ('change' in payload.response.content
                            && payload.response.content.change === 'Validation') {
                state.forms[form_name].validations = Object.assign({}, payload.response.content.errors);
                payload.commit(Messages.ERROR, { type: 'validate', form: form_name });
            } else if (action === 'validate') {
                payload.commit(Messages.SUCCESS, { type: 'validate', form: form_name });
            } else if (action === 'delete') {
                // Noop
            } else {
                state.forms[form_name].success = payload.response.content.message;
                payload.commit(Messages.SUCCESS, { type: 'create', form: form_name });
            }
        } else if (form_name in state.forms) {
            state.forms[form_name].error = Object.assign({}, {
                found: true, content: payload.response.content,
            });
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
        create_form_if_needed(state, form_name);
        const pool = state.forms[form_name].elements;
        state.forms[form_name].elements = Object.assign({}, pool, { [payload.name]: 1 });
    },

    [Messages.UNREGISTER_FORM_ELEMENT]: (state, payload) => {
        const form_name = payload.form;
        create_form_if_needed(state, form_name);
        delete state.forms[form_name].elements[payload.name];
    },
};
