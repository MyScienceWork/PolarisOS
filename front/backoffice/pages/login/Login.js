const Messages = require('../../../common/api/messages');
const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {
                email: undefined,
                password: undefined,
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
    },
    mounted() {
        this.$store.commit(Messages.LOGIN_PASS, { status: 'na' });
        if (this.$router.query.ticket) {
            this.$store.dispatch('authenticate', {
                email: null,
                password: null,
                redirect: this.$route.query.redirect,
                ticket: this.$router.query.ticket,
            });
        }
    },
    watch: {
        login_status(ns) {
            if (ns === 'success') {
                const redirect = this.$route.query.redirect;
                if (redirect == null) {
                    this.$router.push({ path: '/admin' });
                } else {
                    this.$router.push({ path: redirect });
                }
                location.reload();
            }
        },
    },
    computed: {
        login_status() {
            return this.$store.state.login_status;
        },
    },
};
