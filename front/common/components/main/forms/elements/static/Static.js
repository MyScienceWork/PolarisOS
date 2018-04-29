const InputMixin = require('../../mixins/InputMixin');
const Utils = require('../../../../../utils/utils');
const Messages = require('../../../../../api/messages');
const RegisterMixin = require('../../../../../mixins/RegisterMixin');
const LangMixin = require('../../../../../mixins/LangMixin');
const Handlebars = require('../../../../../../../app/modules/utils/templating');

module.exports = {
    props: {
        name: { required: true, type: String },
        label: { default: '', type: String },
        type: { required: true, type: String },
        modal_help: { default: false, type: Boolean },
        help: { required: false, default: '', type: String },
        template: { required: false, default: '', type: String },
        defaultValue: { default: null, required: false },
    },
    mixins: [RegisterMixin, InputMixin, LangMixin],
    data() {
        return {
            state: {
                value: null,
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
            const info = Utils.find_value_with_path(form.content, this.name.split('.'));

            if (info == null) {
                this.state.value = this.defaultVal;
            } else if (this.type === 'static-html') {
                this.state.value = this.hlang(Handlebars.compile(this.template)(info));
            } else {
                this.state.value = this.hlang(info);
            }
        },
        start_collection() {
            const info = this.state.value;
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.form,
                name: this.name,
                info,
            });
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this);
        },
    },
    beforeMount() {
    },
    mounted() {
        this.initialize();
    },
    computed: {
        current_state() {
            return this.fstate(this.form);
        },
        defaultVal() {
            if (this.defaultValue != null) {
                return this.defaultValue;
            }

            switch (this.type) {
            case 'static-html':
            case 'static-text':
                return '';
            case 'static-list':
                return [];
            default:
                return undefined;
            }
        },
    },
};
