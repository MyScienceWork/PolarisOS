const VSelect = require('vue-select').VueSelect;
const InputMixin = require('../../mixins/InputMixin');
const Utils = require('../../../../../utils/utils');
const Messages = require('../../../../../api/messages');
const RegisterMixin = require('../../../../../mixins/RegisterMixin');

module.exports = {
    props: {
        name: { required: true, type: String },
        label: { default: '', type: String },
        placeholder: { default: '', type: String },
        isRequired: { default: false, type: Boolean },
        // form: { required: true, type: String }, //InputMixin
        multi: { default: false, type: Boolean },
        readonly: { default: false, type: Boolean },
        options: { required: true, type: Array },
        fieldLabel: { required: false, default: 'label', type: String },
        fieldValue: { required: false, default: 'value', type: String },
        hasAddons: { default: false, type: Boolean },
        modal_help: { default: false, type: Boolean },
        help: { required: false, default: '', type: String },
        viewValidationTexts: { required: false, default: true, type: Boolean },
        isAddon: { required: false, default: false, type: Boolean },
        resetOnOptionsChange: { default: false, type: Boolean },
    },
    components: {
        'v-select': VSelect,
    },
    mixins: [RegisterMixin, InputMixin],
    data() {
        return {
            state: {
                selected: null,
                options: [],
                showHelpModal: false,
            },
        };
    },
    methods: {
        toggleHelpModal(e) {
            e.preventDefault();
            if (this.modal_help) {
                this.state.showHelpModal = !this.state.showHelpModal;
            }
        },
        initialize() {
            const form = this.$store.state.forms[this.form];
            let info = Utils.find_value_with_path(form.content, this.name.split('.'));

            if (info == null) {
                this.state.selected = null;
                return;
            } else if (info instanceof Array) {
                info = info.map((o) => {
                    if (this.fieldLabel in o) {
                        return o;
                    }
                    const missing = this.options.filter(op =>
                        o[this.fieldValue] === op[this.fieldValue]);
                    if (missing.length > 0) {
                        o[this.fieldLabel] = missing[0][this.fieldLabel];
                        return o;
                    }
                    return null;
                }).filter(o => o != null);
            } else if (typeof info === 'string') {
                const missing = this.options.filter(o => info === o[this.fieldValue]);
                if (missing.length > 0) {
                    info = { [this.fieldValue]: info,
                        [this.fieldLabel]: missing[0][this.fieldLabel] };
                } else {
                    info = null;
                }
            } else {
                const missing = this.options.filter(o =>
                    info[this.fieldValue] === o[this.fieldValue]);
                if (missing.length > 0) {
                    info = { [this.fieldValue]: info,
                        [this.fieldLabel]: missing[0][this.fieldLabel] };
                } else {
                    info = null;
                }
            }

            if (info == null) {
                this.state.selected = null;
            } else if (info instanceof Array) {
                this.state.selected = info.map(o =>
                    ({ label: o[this.fieldLabel], value: o[this.fieldValue] }));
            } else {
                this.state.selected = { label: info[this.fieldLabel],
                    value: info[this.fieldValue] };
            }
        },
        start_collection() {
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.form,
                name: this.name,
                info: this.extract_values(this.state.selected),
            });
        },
        onChange(val) {
            if (this.readonly) {
                // Noop
            } else {
                this.state.selected = val;
                this.$emit('select-change', val);
            }
        },
        extract_values(infos) {
            if (infos == null) {
                return null;
            }

            if (infos instanceof Array) {
                return infos.map(o => ({ [this.fieldValue]: o.value }));
            }
            return infos.value;
        },
        format_options() {
            if (this.fieldValue === 'value' && this.fieldLabel === 'label') {
                this.state.options = this.options;
            }

            this.state.options = this.options.map(o =>
                    ({ label: o[this.fieldLabel], value: o[this.fieldValue] }));
        },
    },
    watch: {
        options() {
            this.format_options();
        },
        current_state(s) {
            this.dispatch(s, this);
        },
    },
    beforeMount() {
        this.format_options();
    },
    mounted() {
        this.initialize();
    },
    computed: {
        isHidden() {
            return this.readonly && (this.state.selected == null ||
            (this.state.selected instanceof Array && this.state.selected.length === 0));
        },
        readonlyValue() {
            if (this.state.selected instanceof Array) {
                return this.state.selected.map(s => s.label);
            }
            return this.state.selected ? this.state.selected.label : '';
        },
        current_state() {
            return this.fstate(this.form);
        },
    },
};
