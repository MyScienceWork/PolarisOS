const _ = require('lodash');
const APIRoutes = require('../api/routes');
const LangMixin = require('./LangMixin');

module.exports = {
    mixins: [LangMixin],
    computed: {
        fform() {
            return (sink) => {
                if (sink in this.$store.state.forms) {
                    const myform = this.$store.state.forms[sink];
                    const content = myform.content;
                    return content;
                }
                return {};
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
        fstate() {
            return (sink) => {
                if (sink in this.$store.state.forms) {
                    const form = this.$store.state.forms[sink];
                    return form.state;
                }
                return 'initial';
            };
        },

    },
    methods: {
        fetch_form(id, sink) {
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
        show_validation(form) {

        },
        show_error(form) {

        },
        show_success_read(form) {

        },
        dispatch(s, self) {
            switch (s) {
            default:
            case 'update':
            case 'initial':
                self.initialize();
                break;
            case 'loading':
                self.switch_to_loading();
                break;
            case 'collect':
                self.start_collection();
                break;
            case 'completed':
                self.send_information();
                break;
            case 'success_create':
                self.show_success();
                break;
            case 'success_validate':
                self.show_success_validate();
                break;
            case 'success_read':
                self.show_success_read(form);
                break;
            case 'error_validate':
                self.show_validation();
                break;
            case 'error_generic':
                self.show_error();
                break;
            }
        },
    },
};
