const LangMixin = require('../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        form: { type: Object, required: true },
        required: { type: Boolean, default: true },
    },
    data() {
        return {
            state: {
                cform: 'deposit_creation',
                path: 'ok',
                rpath: 'ok',
                rform: 'deposit_read',
            },
        };
    },
    computed: {
        final_form() {
            if (this.required) {
                form.fields.filter(f => f.validations.required);
                return form;
            }
        },
    },
};
