const _ = require('lodash');
const APIRoutes = require('../api/routes');
const LangMixin = require('./LangMixin');

module.exports = {
    mixins: [LangMixin],
    computed: {
        form() {
            return (sink) => {
                if (sink in this.$store.state.forms) {
                    const myform = this.$store.state.forms[sink];
                    const content = myform.content;
                    return content;
                }
                return {};
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
    },
};
