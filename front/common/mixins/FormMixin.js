const _ = require('lodash');
const APIRoutes = require('../api/routes');
const Messages = require('../api/messages');
const LangMixin = require('./LangMixin');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        user_forms: 'user_forms_read',
                    },
                    paths: {
                        reads: {
                            user_forms: APIRoutes.entity('form', 'POST', true),
                        },
                    },
                },
            },
        };
    },
    computed: {
        fform() {
            return (sink) => {
                if (sink in this.$store.state.forms) {
                    const myform = this.$store.state.forms[sink];
                    return myform;
                }
                return {};
            };
        },
        fsuccess() {
            return (sink) => {
                const form = this.fform(sink);
                if ('success' in form) {
                    return form.success;
                }
                return null;
            };
        },
        fcontent() {
            return (sink) => {
                const myform = this.fform(sink);
                if (Object.keys(myform).length > 0) {
                    return myform.content;
                }
                return {};
            };
        },
        acontent() {
            return (sink) => {
                const _content = this.fcontent(sink);
                if (!_content) {
                    return [];
                }
                if (!(_content instanceof Array) || _content.length === 0) {
                    return [];
                }
                return _content;
            };
        },
        fstate() {
            return (sink) => {
                const myform = this.fform(sink);
                if (Object.keys(myform).length > 0) {
                    return myform.state;
                }
                return 'initial';
            };
        },
        user_forms() {
            const content = this.fcontent(this.state.sinks.reads.user_forms);
            if (!(content instanceof Array) || content.length === 0) {
                return () => [];
            }
            return (f) => {
                const r = content.filter(c => c.name === f);
                if (r.length > 0) {
                    return r[0];
                }
                return [];
            };
        },
    },
    methods: {
        fetch_form(id, sink) {
            this.$store.commit(Messages.INITIALIZE, {
                form: sink,
            });
            this.$store.dispatch('single_read', {
                form: sink,
                path: APIRoutes.entity('form', 'GET', false, id, '', 'fields.subform,fields.datasource'),
            });
        },
        initialize(form) {

        },
        switch_to_loading(form) {

        },
        start_collection(form) {

        },
        send_information(form) {

        },
        show_success(form) {

        },
        show_success_validate(form) {

        },
        show_success_delete(form) {

        },
        show_validation(form) {

        },
        show_error(form) {

        },
        show_success_read(form) {

        },
        dispatch(s, self, form) {
            switch (s) {
            default:
            case 'noop':
            case 'transfer':
                break;
            case 'update':
            case 'initial':
                self.initialize(form);
                break;
            case 'loading':
                self.switch_to_loading(form);
                break;
            case 'collect':
                self.start_collection(form);
                break;
            case 'completed':
                self.send_information(form);
                break;
            case 'success_create':
                self.show_success(form);
                break;
            case 'success_read':
                self.show_success_read(form);
                break;
            case 'success_delete':
                self.show_success_delete(form);
                break;
            case 'success_validate':
                self.show_success_validate(form);
                break;
            case 'error_validate':
                self.show_validation(form);
                break;
            case 'error_generic':
                self.show_error(form);
                break;
            }
        },
    },
};
