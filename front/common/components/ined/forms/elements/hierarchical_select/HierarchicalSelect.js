const Messages = require('../../../../../api/messages');
const Utils = require('../../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');

module.exports = {
    mixins: [InputMixin],
    props: {
        name: { required: true, type: String },
        label: { required: true, type: String },
        isRequired: { default: false, type: Boolean },
        // form: { required: true, type: String }, //InputMixin
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
        initialize() {
            const form = this.$store.state.forms[this.form];
            this.state.value = Utils.find_value_with_path(form.content, this.name.split('.'));
            if (this.state.value == null) {
                this.state.value = this.defaultValue();
            }
        },
        start_collection() {
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.form,
                name: this.name,
                info: this.state.value,
            });
        },
        defaultValue() {
            return undefined;
        },
    },

    watch: {
        current_state(s) {
            this.dispatch(s, this);
        },
    },
    computed: {
        current_state() {
            return this.fstate(this.form);
        },
        isHidden() {
            return false;
        },
        readonlyValue() {
            return this.state.value || '';
        },
    },
};
