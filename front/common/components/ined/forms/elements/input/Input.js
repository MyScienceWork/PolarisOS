const Messages = require('../../../../../api/messages');
const Utils = require('../../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');
const RegisterMixin = require('../../../../../mixins/RegisterMixin');
const moment = require('moment');
const Crypto = require('crypto');

module.exports = {
    mixins: [RegisterMixin, InputMixin],
    props: {
        name: { required: true, type: String },
        label: { required: true, type: String },
        placeholder: { required: false, type: String },
        isRequired: { default: false, type: Boolean },
        type: { required: true, type: String },
        read: { default: false, type: Boolean },
        hidden: { default: false, type: Boolean },
        // form: { required: true, type: String }, //InputMixin
        rows: { default: 10 },
        radioButtons: { default: () => [], type: Array },
        hasAddons: { default: false, type: Boolean },
        isAddon: { default: false, type: Boolean },
        hiddenValue: { default: '', type: String },
        default: { default: null },
        readonly: { default: false, type: Boolean },
        modal_help: { default: false, type: Boolean },
        help: { required: false, type: String, default: '' },
        viewValidationTexts: { required: false, type: Boolean, default: true },
        dateFormat: { required: false, default: 'YYYY-MM-DD' },
    },

    data() {
        return {
            state: {
                value: this.defaultValue(),
                showHelpModal: false,
            },
        };
    },

    components: {
    },

    methods: {
        toggleHelpModal(e) {
            e.preventDefault();
            if (this.modal_help) {
                this.state.showHelpModal = !this.state.showHelpModal;
            }
        },
        action(a, e) {
            e.preventDefault();
            this.$emit('input-action-emit', { action: a });
        },
        initialize() {
            const form = this.$store.state.forms[this.form];
            const value = Utils.find_value_with_path(form.content, this.name.split('.'));
            if (value == null) {
                this.state.value = this.defaultValue();
            } else if (this.type === 'date') {
                this.state.value = moment(value).toDate();
            } else {
                this.state.value = value;
            }
        },
        start_collection() {
            let info = this.state.value;
            if (this.type === 'date') {
                if (typeof info !== 'string') {
                    info = +moment(info.toISOString());
                }
            } else if (this.type === 'time') {
                if (typeof info !== 'string') {
                    info = moment(info.toISOString()).format('HH:mm');
                }
            } else if (this.type === 'password-sha1' && this.state.value != null && this.state.value.trim() !== '') {
                info = Crypto.createHash('sha1').update(this.state.value).digest('hex');
            }

            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.form,
                name: this.name,
                info,
            });
        },
        defaultValue() {
            if (this.default != null) {
                return this.default;
            }

            if (this.type === 'checkbox' || this.type === 'radio') {
                return false;
            } else if (this.type === 'date') {
                return moment().toDate();
            } else if (this.type === 'hidden') {
                return this.hiddenValue;
            }
            return undefined;
        },
        computeReadonlyValue(v) {
            if (this.type === 'date') {
                if (typeof v === 'string') {
                    return v;
                }
                return moment(v.toISOString()).format(this.dateFormat);
            } else if (this.type === 'time') {
                if (typeof v === 'string') {
                    return v;
                }
                return moment(v.toISOString()).format('HH:mm');
            }
            return v;
        },
    },

    watch: {
        hiddenValue(n) {
            if (this.type === 'hidden' && this.state.value !== n) {
                this.initialize();
            }
        },
        current_state(s) {
            this.dispatch(s, this);
        },
        readonlyValue(v) {
            return this.computeReadonlyValue(v);
        },
    },
    computed: {
        emptyValue() {
            return this.state.value === null ||
                this.state.value === undefined ||
                (this.state.value instanceof String && this.state.value.trim() === '');
        },
        current_state() {
            return this.fstate(this.form);
        },
        readonlyValue() {
            return this.computeReadonlyValue(this.state.value);
        },
    },
    mounted() {
        this.initialize();
    },
};
