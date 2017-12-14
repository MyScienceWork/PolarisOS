const Messages = require('../../../../../api/messages');
const Utils = require('../../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');
const RegisterMixin = require('../../../../../mixins/RegisterMixin');
const moment = require('moment');

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
        readonly: { default: false, type: Boolean },
    },

    data() {
        return {
            state: {
                value: this.defaultValue(),
            },
        };
    },

    methods: {
        action(a, e) {
            e.preventDefault();
            this.$emit('input-action-emit', { action: a });
        },
        initialize() {
            const form = this.$store.state.forms[this.form];
            this.state.value = Utils.find_value_with_path(form.content, this.name.split('.'));
            if (this.state.value == null) {
                this.state.value = this.defaultValue();
            }
        },
        start_collection() {
            let info = this.state.value;
            if (this.type === 'date') {
                info = moment(this.state.value).toISOString();
            }

            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.form,
                name: this.name,
                info,
            });
        },
        defaultValue() {
            if (this.type === 'checkbox' || this.type === 'radio') {
                return false;
            } else if (this.type === 'date') {
                return moment().toDate();
            } else if (this.type === 'hidden') {
                return this.hiddenValue;
            }
            return undefined;
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
    },
    mounted() {
        this.initialize();
    },
};
