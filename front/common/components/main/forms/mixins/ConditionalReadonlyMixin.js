const FormMixin = require('../../../../mixins/FormMixin');
const Messages = require('../../../../api/messages');

module.exports = {
    mixins: [FormMixin],
    props: {
        conditonalReadonly: { type: String, default: '' },
    },
    data() {
        return {
            state: {
                isConditionalReadonly: false,
                unsubscribeConditonalReadonly: undefined,
            },
        };
    },
    methods: {
        translate_conditional_readonly() {
            if (this.conditonalReadonly === '') {
                return {
                    name: '',
                    value: undefined,
                };
            }
            const name = this.conditonalReadonly.substr(0, this.conditonalReadonly.indexOf('=')).replace(/\s+/g, '');
            const value = this.conditonalReadonly.substr(this.conditonalReadonly.indexOf('=') + 1, this.conditonalReadonly.length).replace(/\s+/g, '');
            return {
                name,
                value,
            };
        },
        compute_conditional_readonly(form) {
            if (form === undefined || !form || form === {}) {
                return false;
            }

            const info = this.translate_conditional_readonly();
            const inputValue = form.content[info.name];

            if (info.value === 'true') {
                return inputValue;
            }
            if (info.value === 'false') {
                return !inputValue;
            }
            if (!isNaN(parseInt(info.value,10))) {
                return inputValue === parseInt(info.value, 10);
            }
            return inputValue === info.value;
        },
    },
    mounted() {
        this.state.unsubscribeConditonalReadonly = this.$store.subscribe((mutation, state) => {
            if (mutation.type === Messages.COMPLETE_FORM_ELEMENT) {
                if (this.form in state.forms) {
                    this.state.isConditionalReadonly = this.compute_conditional_readonly(state.forms[this.form]);
                }
            }
        });
    },
    beforeDestroy() {
        this.state.unsubscribeConditonalReadonly();
    },
};
