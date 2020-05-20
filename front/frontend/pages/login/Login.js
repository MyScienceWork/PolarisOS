const Messages = require('../../../common/api/messages');
const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {
                email: undefined,
                password: undefined,
                new_password: undefined,
                confirm_new_password: undefined,
                forgot_password: false,
                reset_password: false,
                matching_new_password: true,
            },
        };
    },
    methods: {
        authenticate(e) {
            e.preventDefault();
            this.$store.dispatch('authenticate', {
                email: this.state.email,
                password: this.state.password,
            });
        },
        forgot_password(e) {
            e.preventDefault();
            this.$store.dispatch('forgot_password', {
                email: this.state.email,
            });
        },
        reset_password(e) {
            e.preventDefault();
            if (this.state.new_password !== this.state.confirm_new_password) {
                return;
            }
            this.$store.dispatch('reset_password', {
                email: this.state.email,
                password: this.state.new_password,
                key: this.$route.query.key,
            });
            this.state.reset_password = false;
        },
        show_forgot_password(e) {
            e.preventDefault();
            this.state.forgot_password = true;
        },
        show_login(e) {
            e.preventDefault();
            this.state.forgot_password = false;
        },
    },
    beforeMount() {
        this.$store.commit(Messages.LOGIN_PASS, { status: 'na' });

        if (this.$route.query.ticket) {
            this.$store.dispatch('authenticate', {
                email: null,
                password: null,
                ticket: this.$route.query.ticket,
                fullPath: this.$route.fullPath,
            });
        }

        if (this.$route.query.email) {
            this.state.email = this.$route.query.email;
        }
    },
    watch: {
        login_status(ns) {
            if (ns === 'success') {
                const redirect = this.$route.query.redirect;
                if (redirect == null || redirect === undefined) {
                    this.$router.push({ path: '/' });
                } else {
                    this.$router.push({ path: redirect });
                }
            }
        },
        reset_password_status(ns) {
            if (ns === 'success') {
                const redirect = this.$route.query.redirect;
                this.$router.push({ path: '/login' });
            }
        },
    },
    computed: {
        forgot_password_page() {
            const query = this.$route.query;
            return query.key;
        },
        login_status() {
            return this.$store.state.login_status;
        },
        forgot_password_status() {
            return this.$store.state.forgot_password_status;
        },
        reset_password_status() {
            return this.$store.state.reset_password_status;
        },
        not_matching_new_password() {
            return this.state.new_password !== this.state.confirm_new_password;
        },
    },
};
