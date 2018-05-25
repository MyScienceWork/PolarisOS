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
        if (this.$route.query.ticket) {
            this.$store.dispatch('authenticate', {
                email: null,
                password: null,
                fullPath: this.$route.fullPath,
                ticket: this.$route.query.ticket,
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
            }
        },
    },
    computed: {
        login_status() {
            return this.$store.state.login_status;
        },
    },
};
