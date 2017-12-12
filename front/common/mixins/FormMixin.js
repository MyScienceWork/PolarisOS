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
        initialize() {

        },
        switch_to_loading() {

        },
        start_collection() {

        },
        send_information() {

        },
        show_success() {

        },
        show_validation() {

        },
        show_error() {

        },
        dispatch(s, self) {
            console.log('dispatch', s, self);
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
