const Messages = require('../../../../api/messages');
const FormMixin = require('../../../../mixins/FormMixin');

module.exports = {
    mixins: [FormMixin],
    props: {
        form: { required: true, type: String },
    },
    computed: {
        validations() {
            if (this.form in this.$store.state.forms) {
                const form = this.$store.state.forms[this.form];
                if (this.name in form.validations) {
                    return form.validations[this.name].map(o => o.message);
                }
                return [];
            }
            return [];
        },
    },
};
