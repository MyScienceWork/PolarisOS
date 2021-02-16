const FormMixin = require('../../../../mixins/FormMixin');
const Messages = require('../../../../api/messages');

module.exports = {
    mixins: [FormMixin],
    props: {
        conditionalReadonly: { type: String, default: '' },
    },
    data() {
        return {
            state: {
                isConditionalReadonly: false,
                unsubscribeConditionalReadonly: undefined,
            },
        };
    },
    methods: {
        validate_conditional_readonly(string) {
            if (string === '' || string === undefined) {
                return false;
            }
            return string.includes('!=') || string.includes('=');
        },
        translate_conditional_readonly() {
            if (this.validate_conditional_readonly(this.conditionalReadonly)) {
                return {
                    name: '',
                    value: undefined,
                    condition: '',
                };
            }
            let condition;
            let name;

            if (this.conditionalReadonly.includes('!=')) {
                condition = '!=';
                name = this.conditionalReadonly.substr(0, this.conditionalReadonly.indexOf('!')).replace(/\s+/g, '');
            } else {
                condition = '=';
                name = this.conditionalReadonly.substr(0, this.conditionalReadonly.indexOf('=')).replace(/\s+/g, '');
            }
            const value = this.conditionalReadonly.substr(this.conditionalReadonly.indexOf('=') + 1, this.conditionalReadonly.length).replace(/\s+/g, '');

            return {
                name,
                value,
                condition,
            };
        },
        compute_conditional_readonly(form) {
            if (form === undefined || !form || form === {}) {
                return false;
            }

            const { condition, name, value } = this.translate_conditional_readonly();
            const inputValue = form.content[name];

            if (condition === '=') {
                if (value === undefined) {
                    return false;
                }
                if (value === 'true') {
                    return inputValue;
                }
                if (value === 'false') {
                    return !inputValue;
                }
                if (!isNaN(parseInt(value,10))) {
                    return inputValue === parseInt(value, 10);
                }
                return inputValue === value;
            }

            if (value === undefined) {
                return true;
            }
            if (value !== 'true') {
                return inputValue;
            }
            if (value !== 'false') {
                return !inputValue;
            }
            if (!isNaN(parseInt(value,10))) {
                return inputValue !== parseInt(value, 10);
            }
            return inputValue !== value;
        },
    },
    mounted() {
        if (this.conditionalReadonly !== '') {
            this.state.unsubscribeConditionalReadonly = this.$store.subscribe((mutation, state) => {
                if (mutation.type === Messages.COMPLETE_FORM_ELEMENT) {
                    if (this.form in state.forms) {
                        this.state.isConditionalReadonly = this.compute_conditional_readonly(state.forms[this.form]);
                    }
                }
            });
        }
    },
    beforeDestroy() {
        if (this.conditionalReadonly !== '') {
            this.state.unsubscribeConditionalReadonly();
        }
    },
};
