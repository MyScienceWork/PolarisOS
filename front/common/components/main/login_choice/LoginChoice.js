const LangMixin = require('../../../mixins/LangMixin');
const UserMixin = require('../../../mixins/UserMixin');
const OAMixin = require('../../../mixins/ObjectAccessMixin');

module.exports = {
    mixins: [LangMixin, UserMixin, OAMixin],
    props: {
        backoffice: { default: false, type: Boolean },
    },
    methods: {
    },
    mounted() {
        if (this.default_cas_sso && this.use_cas_sso) {
            this.redirect_to_cas(this.generate_cas_sso_url(this.$route.query.redirect, this.backoffice));
            return;
        }

        if (!this.use_cas_sso) {
            this.$router.push({ path: this.backoffice ? '/admin/login' : '/login' });
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
            const prefix = this.backoffice ? '/admin/login' : '/login';
            if (this.$route.query.redirect) {
                return `${prefix}?redirect=${encodeURIComponent(this.$route.query.redirect)}`;
            }
            return prefix;
        },
    },
};
