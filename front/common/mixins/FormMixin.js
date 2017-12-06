const _ = require('lodash');
const APIRoutes = require('../api/routes');
const LangMixin = require('./LangMixin');

module.exports = {
    mixins: [LangMixin],
    computed: {
        datasources() {
            return this.$store.state.datasources;
        },
        forms() {
            if (this.state.forms.name in this.$store.state.forms) {
                const myform = this.$store.state.forms[this.state.forms.name];
                const content = myform.content;
                return content;
            }
            return {};
        },
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.forms.name,
            path: APIRoutes.entity('form', 'POST', true),
            body: {
                size: 1000,
                where: {
                    $or: [{ name: this.state.forms.fname }, { 'parents.name': this.state.forms.fname }],
                },
            },
        });
    },
};
