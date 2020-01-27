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
        ideLang: { default: 'json', type: String },
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
                value: undefined,
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
            require('brace/mode/html');
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
                const hashedPassword = Crypto.createHash('sha1').update(info).digest('hex');
                this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: hashedPassword,
                });
            }

            if (this.type === 'number' && e.target.value === "") {
                this.$store.commit(Messages.REMOVE_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                });
            } else if (this.type !== 'password-sha1' || info === null || info.trim() === '') {
                this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info,
                });
            }

            this.$emit('value-change', info);

            const formatted_info = this.formatValue(info);

            if (this.type !== 'date') {
                this.state.value = formatted_info;
            }
        },
        defaultValue() {
            if (this.default != null) {
                return this.default;
            }

            if (this.type === 'checkbox' || this.type === 'radio') {
                return false;
            } else if (this.type === 'date') {
                return undefined;// +moment.utc();
            } else if (this.type === 'date-year') {
                return null;// +moment.utc(moment.utc().format('YYYY'), 'YYYY');
            } else if (this.type === 'hidden') {
                return this.hiddenValue;
            } else if (this.type === 'ide-editor') {
                return '';
            }
            return '';
        },
        computeReadonlyValue(v) {
            if (!v) {
                return v;
            }

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
        formatValue(info) {
            if (info == null) {
                return info;
            } else if (this.type === 'date') {
                return moment(info).toDate();
            } else if (this.type === 'date-year') {
                return moment(info).format('YYYY');
            }
            return info;
        },
        init() {
            const form = this.$store.state.forms[this.form] || {};
            const value = Utils.find_value_with_path(form.content, this.name.split('.'));
            if (value == null) {
                const info = this.defaultValue();

                if (this.type === 'hidden' || this.type === 'date') {
                    this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                        form: this.form,
                        name: this.name,
                        info,
                    });
                }

                this.state.value = this.formatValue(info);
            } else {
                this.state.value = this.formatValue(value);
            }
        },
    },

    watch: {
        hiddenValue(n) {
            if (this.type === 'hidden' && this.value !== n) {
                this.update({ target: { value: n } });
            }
        },
        current_state(s) {
            /* const key = this.type === 'checkbox' || this.type === 'radio' ? 'checked' : 'value';
            if (this.type === 'hidden' && s === 'initial') {
                this.update({ target: { [key]: this.hiddenValue } });
            }*/
            if (s === 'update' || s === 'initial') {
                this.init();
            }
        },
        readonlyValue(v) {
            return this.computeReadonlyValue(v);
        },
    },
    computed: {
        emptyValue() {
            return this.state.value === null ||
                this.state.value === undefined ||
                ((this.state.value instanceof String ||
                   typeof this.state.value === 'string') && this.state.value.trim() === '');
        },
        current_state() {
            return this.fstate(this.form);
        },
        readonlyValue() {
            return this.computeReadonlyValue(this.state.value);
        },
    },
    beforeMount() {
        this.init();
    },
    mounted() {
    },
};
