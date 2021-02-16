const FormMixin = require('../../../../mixins/FormMixin');
const Messages = require('../../../../api/messages');
const objectPath = require('object-path');

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
        translate_value(value) {
            switch (value) {
            case 'undefined':
                return undefined;
            case 'null':
                return null;
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                if (!isNaN(parseInt(value, 10))) {
                    return parseInt(value, 10);
                }
                return value;
            }
        },
        compute_conditional_readonly(form) {
            if (form === undefined || !form || form === {}) {
                return false;
            }

            const { condition, name, value } = this.translate_conditional_readonly();
            const inputValue = objectPath.get(form.content, name);
            const translatedValue = this.translate_value(value);
            switch (condition) {
            default:
            case '=':
                return translatedValue === inputValue;
            case '!=':
                return translatedValue !== inputValue;
            }
        },
        watch_value(form) {
            if (this.validate_conditional_readonly(this.conditionalReadonly)) {
                this.state.unsubscribeConditionalReadonly = this.$store.subscribe((mutation, state) => {
                    if (mutation.type === Messages.COMPLETE_FORM_ELEMENT) {
                        if (form in state.forms) {
                            this.state.isConditionalReadonly = this.compute_conditional_readonly(state.forms[form]);
                        }
                    }
                });
            }
        },
        unsbuscribe_watcher() {
            if (this.validate_conditional_readonly(this.conditionalReadonly)) {
                this.state.unsubscribeConditionalReadonly();
            }
        },
    },
    beforeMount() {
        this.watch_value(this.form);
    },
    beforeDestroy() {
        this.unsbuscribe_watcher();
    },
};
