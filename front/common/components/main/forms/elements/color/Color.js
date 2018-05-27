const VueColor = require('vue-color');
const VueClickAway = require('vue-clickaway');
const InputMixin = require('../../mixins/InputMixin');
const Utils = require('../../../../../utils/utils');
const Messages = require('../../../../../api/messages');
const LangMixin = require('../../../../../mixins/LangMixin');
const FormMixin = require('../../../../../mixins/FormMixin');

module.exports = {
    props: {
        name: { required: true, type: String },
        label: { required: true, type: String },
        isRequired: { default: false, type: Boolean },
        form: { required: true, type: String },
        readonly: { default: false, type: Boolean },
        modal_help: { default: false, type: Boolean },
        help: { required: false, type: String, default: '' },
        viewValidationTexts: { required: false, type: Boolean, default: true },
    },
    components: {
        'sketch-picker': VueColor.Sketch,
    },
    directives: {
        onClickAway: VueClickAway.directive,
    },
    mixins: [InputMixin, LangMixin, FormMixin],
    data() {
        return {
            state: {
                show: false,
                showHelpModal: false,
                value: this.defaultValue(),
            },
        };
    },
    methods: {
        away() {
            this.state.show = false;
        },
        defaultValue() {
            return '#FFF';
        },
        toggleHelpModal(e) {
            e.preventDefault();
            if (this.modal_help) {
                this.state.showHelpModal = !this.state.showHelpModal;
            }
        },
        update(e) {
            // this.state.color = e.hex;
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.form,
                name: this.name,
                info: e.hex,
            });
            this.state.value = e.hex;
        },
        initialize(sink) {
            if (sink !== this.form) {
                return;
            }
            const form = this.$store.state.forms[sink] || {};
            this.state.value = Utils.find_value_with_path(form.content || {}, this.name.split('.')) || this.defaultValue();
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this, this.form);
        },
    },
    computed: {
        current_state() {
            return this.fstate(this.form);
        },

    },
    mounted() {
        this.initialize(this.form);
    },
};
