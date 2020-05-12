const _ = require('lodash');
const Messages = require('../../../../../api/messages');
const Utils = require('../../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');
const moment = require('moment');
const Crypto = require('crypto');
const AceEditor = require('vue2-ace-editor');
const APIRoutes = require('../../../../../api/routes');

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
        rows: { default: 15 },
        radioButtons: { default: () => [], type: Array },
        hasAddons: { default: false, type: Boolean },
        isAddon: { default: false, type: Boolean },
        hiddenValue: { default: '', type: String },
        default: { default: null },
        readonly: { default: false, type: Boolean },
        duplicate_warning: { default: false, type: Boolean },
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
        minDate: { require: false, type: Date },
        maxDate: { require: false, type: Date },
        fieldId: { required: false, type: Number },
    },

    data() {
        return {
            state: {
                value: undefined,
                showHelpModal: false,
                duplicate_warning_message: '',
                duplicate_warning_items: [],
                sinks: {
                    reads: {
                        duplicate_warning: [],
                    },
                },
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
                if (info && typeof info !== 'string') {
                    // date is local timezone so now we convert it to UTC
                    info = new Date(info.getTime() - (info.getTimezoneOffset() * 60000));
                    info = +moment.utc(info.toUTCString());
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

            if (this.type !== 'password-sha1' || info === null || info.trim() === '') {
                this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info,
                });
            }

            if (this.type === 'date') {
                const date_info = { info, name: this.name };
                this.$emit('date-value-change', date_info);
            }

            this.$emit('value-change', info);

            const formatted_info = this.formatValue(info);

            if (this.type !== 'date') {
                this.state.value = formatted_info;
            }
        },
        blur(e) {
            if (!this.duplicate_warning) {
                return;
            }

            let info = null;

            if (_.isObject(e)) {
                info = Utils.find_value_with_path(e, 'target.value'.split('.'));
            }

            if (info == null) {
                info = e;
            }
            if (info.trim() === '') {
                return;
            }
            const cform_name = this.form.split('_').slice(0, -1).join('_');
            this.state.sinks.reads.duplicate_warning[this.name] = `duplicate_warning_${this.name}_read`;
            this.$store.dispatch('search', {
                form: this.state.sinks.reads.duplicate_warning[this.name],
                path: APIRoutes.entity(cform_name, 'POST', true),
                body: {
                    where: {
                        $and: {
                            [this.name]: info,
                        },
                    },
                },
            });
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
            this.blur(this.state.value);
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
        content_duplicate_warning(data) {
            if (!(data instanceof Array) || data.length === 0) {
                this.$set(this.state, 'duplicate_warning_message', '');
                return;
            }
            const duplicate_warning_items = [];
            data.forEach((item) => {
                duplicate_warning_items.push(item[this.name]);
            });
            this.$set(this.state, 'duplicate_warning_message', `l_duplicate_${this.form}_${this.name}`);
            this.$set(this.state, 'duplicate_warning_items', duplicate_warning_items);
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
        contentForm() {
            return this.fcontent(this.cform);
        },
        get_min_date() {
            if (this.minDate) {
                return this.minDate;
            }
            return null;
        },
        get_max_date() {
            if (this.maxDate) {
                return this.maxDate;
            }
            return null;
        },
        content_duplicate_warning() {
            return this.fcontent(this.state.sinks.reads.duplicate_warning[this.name]);
        },
        duplicate_warning_message() {
            return this.state.duplicate_warning_message;
        },
    },
    beforeMount() {
        this.init();
    },
    mounted() {
    },
};
