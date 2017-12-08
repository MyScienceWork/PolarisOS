const _ = require('lodash');
const APIRoutes = require('../api/routes');
const LangMixin = require('./LangMixin');

module.exports = {
    mixins: [LangMixin],
    computed: {
        form() {
            if (this.state.form_name in this.$store.state.forms) {
                const myform = this.$store.state.forms[this.state.form_name];
                const content = myform.content;
                return content;
            }
            return {};
        },
    },
    methods: {
        fetch_form(id) {
            this.$store.dispatch('single_read', {
                form: this.state.form_name,
                path: APIRoutes.entity('form', 'GET', false, id),
            });
        },
    },
};
