const LangMixin = require('./LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        form: { required: true, type: String },
    },
    computed: {
        variables() {
            const state = this.$store.state;
            if (this.form in state.forms) {
                const page = state.forms[this.form].content;
                return page.variables.reduce((obj, value) => {
                    obj[value.name] = value;
                    return obj;
                }, {});
            }
            return {};
        },
        texts() {
            const state = this.$store.state;
            if (this.form in state.forms) {
                const page = state.forms[this.form].content;
                return page.texts.reduce((obj, value) => {
                    value.content = this.lang(value.content);
                    obj[value.name] = value;
                    return obj;
                }, {});
            }
            return {};
        },
        events() {
            const state = this.$store.state;
            if (this.form in state.forms) {
                const page = state.forms[this.form].content;
                return page.events.reduce((obj, value) => {
                    obj[value.name] = value.name;
                    return obj;
                }, {});
            }
            return {};
        },
    },
};
