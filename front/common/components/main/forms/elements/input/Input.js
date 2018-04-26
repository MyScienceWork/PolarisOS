const Messages = require('../../../../../api/messages');
const Utils = require('../../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');
const RegisterMixin = require('../../../../../mixins/RegisterMixin');
const moment = require('moment');
const Crypto = require('crypto');
const AceEditor = require('vue2-ace-editor');

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
        yearRangeStart: { required: false,
            default: parseInt(moment().subtract(150, 'y').format('YYYY'), 10),
            type: Number },
        yearRangeEnd: { required: false,
            default: parseInt(moment().add(3, 'y').format('YYYY'), 10),
            type: Number },
        yearStep: { required: false, default: 1, type: Number },
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
        AceEditor,
    },

    methods: {
        IDEInit() {
            require('brace/ext/language_tools');
            require('brace/mode/json');
            require('brace/theme/solarized_light');
        },
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
            } else if (this.type === 'date-year') {
                this.state.value = moment(value).format('YYYY');
            } else {
                this.state.value = value;
            }
        },
        start_collection() {
            let info = this.state.value;
            if (this.type === 'date') {
                if (typeof info !== 'string') {
                    info = +moment.utc(info.toISOString());
                }
            } else if (this.type === 'date-year') {
                const number = Math.min(Math.max(this.yearRangeStart, parseInt(info, 10)), this.yearRangeEnd);
                info = +moment.utc(`${number}`, 'YYYY');
            } else if (this.type === 'time') {
                if (typeof info !== 'string') {
                    info = moment.utc(info.toISOString()).format('HH:mm');
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
                return moment.utc().toDate();
            } else if (this.type === 'date-year') {
                return moment.utc().format('YYYY');
            } else if (this.type === 'hidden') {
                return this.hiddenValue;
            } else if (this.type === 'ide-editor') {
                return '';
            }
            return undefined;
        },
        computeReadonlyValue(v) {
            if (this.type === 'date' || this.type === 'date-year') {
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
        update_value(e) {
            this.state.value = e.target.checked;
            this.$emit('value-change', this.state.value);
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
