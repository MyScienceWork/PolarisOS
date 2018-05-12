const _ = require('lodash');
const Messages = require('../../../../../api/messages');
const Utils = require('../../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');
const moment = require('moment');
const Crypto = require('crypto');
const AceEditor = require('vue2-ace-editor');

module.exports = {
    mixins: [InputMixin],
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
                       // value: this.defaultValue(),
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
        update(e) {
            let info = null;
            if (_.isObject(e) && 'target' in e) {
                if (this.type === 'checkbox') {
                    info = e.target.checked;
                } else {
                    info = e.target.value;
                }
            } else {
                info = e;
            }

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
            } else if (this.type === 'password-sha1' && info != null && info.trim() !== '') {
                info = Crypto.createHash('sha1').update(info).digest('hex');
            }

            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.form,
                name: this.name,
                info,
            });
            this.$emit('value-change', info);
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
    },

    watch: {
        hiddenValue(n) {
            if (this.type === 'hidden' && this.value !== n) {
                this.update({ target: { value: n } });
            }
        },
        current_state(s) {
            if (this.type === 'hidden' && s === 'initial') {
                this.update({ target: { value: this.hiddenValue } });
            }
        },
        readonlyValue(v) {
            return this.computeReadonlyValue(v);
        },
    },
    computed: {
        emptyValue() {
            return this.value === null ||
                this.value === undefined ||
                (this.value instanceof String && this.value.trim() === '');
        },
        current_state() {
            return this.fstate(this.form);
        },
        readonlyValue() {
            return this.computeReadonlyValue(this.value);
        },
        value() {
            const form = this.$store.state.forms[this.form];
            if (form == null) {
                return this.defaultValue();
            }

            const value = Utils.find_value_with_path(form.content, this.name.split('.'));
            if (value == null) {
                return this.defaultValue();
            } else if (this.type === 'date') {
                return moment(value).toDate();
            } else if (this.type === 'date-year') {
                return moment(value).format('YYYY');
            }
            return value;
        },
    },
    mounted() {
        if (this.type === 'hidden') {
            this.update({ target: { value: this.hiddenValue } });
        }
    },
};
