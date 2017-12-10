const Messages = require('../../../../api/messages');
const APIRoutes = require('../../../../api/routes');
const EventHub = require('../../../../store/event_hub');

module.exports = {
    props: {
        name: { default: 'default_form' },
        hasButtons: { default: true, type: Boolean },
        post_path: { type: String, required: true },
        put_path: { type: String, required: true },
        get_path: { type: String, required: true },
        validate_path: { type: String, required: false },
        get_form: { type: String, required: true },
    },
    data() {
        return {
            state: {
                update_mode: false,
            },
        };
    },
    methods: {
        partial_submit(e) {
            e.preventDefault();
            this.$store.commit(Messages.TOGGLE_RECLAIM_FORM, {
                form: this.name,
                reclaim: true,
                partial: true,
            });
        },
        validate(e) {
            e.preventDefault();
            this.$store.commit(Messages.TOGGLE_RECLAIM_FORM, {
                form: this.name,
                reclaim: true,
                validate: true,
                partial: false,
            });
            this.$store.commit(Messages.LOADING, {
                form: this.name,
            });
        },
        submit(e) {
            e.preventDefault();
            this.$store.commit(Messages.TOGGLE_RECLAIM_FORM, {
                form: this.name,
                reclaim: true,
            });
            this.$store.commit(Messages.LOADING, {
                form: this.name,
            });
        },
        cancel(e) {
            e.preventDefault();
            this.$store.commit(Messages.UPDATE_MODE_FORM, { form: this.name,
                content: {},
                update: false });
            this.$store.commit(Messages.TOGGLE_RECLAIM_FORM, {
                form: this.name,
                reclaim: false,
            });
            this.$store.commit(Messages.CANCEL_FORM, {
                form: this.name,
            });
        },
    },
    beforeMount() {
        EventHub.$on('form-click-on-submit', this.submit);
        EventHub.$on('form-click-on-partial-submit', this.partial_submit);
        EventHub.$on('form-click-on-cancel', this.cancel);
        EventHub.$on('form-click-on-validate', this.validate);
        this.$store.commit(Messages.CREATE_FORM, { form: this.name, content: {} });
    },

    beforeDestroy() {
        EventHub.$off('form-click-on-submit');
        EventHub.$off('form-click-on-partial-submit');
        EventHub.$off('form-click-on-cancel');
        EventHub.$off('form-click-on-validate');
        this.$store.commit(Messages.REMOVE_FORM, { form: this.name });
    },

    computed: {
        update_mode() {
            if (this.name in this.$store.state.forms) {
                const form = this.$store.state.forms[this.name];
                return form.update;
            }
            return false;
        },
        error() {
            if (this.name in this.$store.state.forms) {
                const form = this.$store.state.forms[this.name];
                return form.error;
            }
            return { };
        },
        loading() {
            if (this.name in this.$store.state.forms) {
                const form = this.$store.state.forms[this.name];
                return form.loading;
            }
            return false;
        },
        claims() {
            if (this.name in this.$store.state.forms) {
                const form = this.$store.state.forms[this.name];
                return form.claims;
            }
            return 0;
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
        update_mode(n) {
            this.state.update_mode = n;
        },
        claims(n) {
            const form = this.$store.state.forms[this.name];
            if (n === form.pool && !form.partial) {
                const payload = {
                    form: this.name,
                    rpath: this.get_path,
                    rform: this.get_form,
                    body: form.content,
                };
                if (this.state.update_mode) {
                    if (form.validate) {
                        payload.path = this.validate_path;
                        this.$store.dispatch('validate', payload);
                    } else {
                        payload.path = this.put_path;
                        this.$store.dispatch('update', payload);
                    }
                } else if (form.validate) {
                    payload.path = this.validate_path;
                    this.$store.dispatch('validate', payload);
                } else {
                    payload.path = this.post_path;
                    this.$store.dispatch('create', payload);
                }
            }
        },
        success(n) {
        },
    },
};
