const Messages = require('../../../../api/messages');
const APIRoutes = require('../../../../api/routes');
const EventHub = require('../../../../store/event_hub');
const FormMixin = require('../../../../mixins/FormMixin');

module.exports = {
    mixins: [FormMixin],
    props: {
        name: { default: 'default_form' },
        hasButtons: { default: true, type: Boolean },
        post_path: { type: String, required: true },
        put_path: { type: String, required: true },
        get_path: { type: String, required: true },
        validate_path: { type: String, required: false },
        get_form: { type: String, required: true },
        showErrors: { type: Boolean, default: true },
    },
    data() {
        return {
            state: {
                update_mode: false,
            },
        };
    },
    methods: {
        submit(e) {
            e.preventDefault();
            this.$store.commit(Messages.COLLECT, {
                form: this.name,
            });
        },
        cancel(e) {
            e.preventDefault();
            this.$store.commit(Messages.INITIALIZE, { form: this.name });
        },

    },
    beforeMount() {
        EventHub.$on('form-click-on-submit', this.submit);
        EventHub.$on('form-click-on-cancel', this.cancel);
    },

    beforeDestroy() {
        EventHub.$off('form-click-on-submit');
        EventHub.$off('form-click-on-cancel');
        this.$store.commit(Messages.REMOVE_FORM, { form: this.name });
    },

    computed: {
        current_state() {
            return this.fstate(this.name);
        },
        error() {
            if (this.name in this.$store.state.forms) {
                const form = this.$store.state.forms[this.name];
                return form.error;
            }
            return { };
        },
        content() {
            if (this.name in this.$store.state.forms) {
                const form = this.$store.state.forms[this.name];
                return form.content;
            }
            return {};
        },
        success() {
            if (this.name in this.$store.state.forms) {
                const form = this.$store.state.forms[this.name];
                return form.success;
            }
            return '';
        },
    },

    watch: {
        content(n) {
            if (n instanceof Array && n.length > 0) {
                this.state.update_mode = true;
            } else if (n instanceof Object && Object.keys(n).length > 0) {
                this.state.update_mode = true;
            } else {
                this.state.update_mode = false;
            }
        },
        success(n) {
        },
    },
};
