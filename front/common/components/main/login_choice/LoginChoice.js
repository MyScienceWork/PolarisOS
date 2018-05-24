const LangMixin = require('../../../mixins/LangMixin');
const UserMixin = require('../../../mixins/UserMixin');
const OAMixin = require('../../../mixins/ObjectAccessMixin');

module.exports = {
    mixins: [LangMixin, UserMixin, OAMixin],
    methods: {
    },
    mounted() {
        if (this.default_cas_sso && this.use_cas_sso) {
            this.redirect_to_cas(this.generate_cas_sso_url(this.$route.query.redirect));
            return;
        }

        if (!this.use_cas_sso) {
            this.$router.push({ path: '/login' });
            location.reload();
        }
    },
    computed: {
        default_cas_sso() {
            return this._oa_find(this.$store.state.global_config, 'authentication.default_cas_sso', false);
        },
        use_cas_sso() {
            return this._oa_find(this.$store.state.global_config, 'authentication.use_cas_sso', false);
        },
        login_url() {
            if (this.$route.query.redirect) {
                return `/login?redirect=${encodeURIComponent(this.$route.query.redirect)}`;
            }
            return '/login';
        },
    },
};
