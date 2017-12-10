const Messages = require('../../../../../api/messages');
const Utils = require('../../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');

module.exports = {
    mixins: [InputMixin],
    props: {
        name: { required: true, type: String },
        label: { required: true, type: String },
        isRequired: { default: false, type: Boolean },
        form: { required: true, type: String },
        readonly: { default: false, type: Boolean },
        options: { type: Array, required: true },
        title: { type: String, default: '' },
        fieldLabel: { type: String, default: 'label' },
        fieldChildLabel: { type: String, default: 'label' },
        fieldChildren: { type: String, default: 'children' },
        fieldValue: { type: String, default: 'value' },
    },

    data() {
        return {
            state: {
                value: this.defaultValue(),
            },
        };
    },

    methods: {
        onChange(e) {
            e.preventDefault();
            this.$emit('hierarchical-select-change', this.state.value);
        },
        update() {
            const form = this.$store.state.forms[this.form];
            if (form.update) {
                this.state.value = Utils.find_value_with_path(form.content, this.name.split('.'));
                if (this.state.value == null) {
                    this.state.value = this.defaultValue();
                }
            } else {
                this.state.value = this.defaultValue();
            }
        },
        defaultValue() {
            return undefined;
        },
    },

    watch: {
        reclaim(n) {
            if (n) {
                this.$store.commit(Messages.RECLAIM_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: this.state.value,
                });
            }
        },
        cancel(n) {
            if (n) {
                this.state.value = this.defaultValue();
            }
        },
    },
    computed: {
    },
};
