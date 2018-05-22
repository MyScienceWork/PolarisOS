const LangMixin = require('../../../mixins/LangMixin');
const OAMixin = require('../../../mixins/ObjectAccessMixin');

module.exports = {
    mixins: [LangMixin, OAMixin],
    methods: {
        redirect_to_cas() {
            window.location.href = this.cas_url;
            // window.location.reload();
        },
    },
    computed: {
        cas_url() {
            const use_cas_sso = this._oa_find(this.$store.state.global_config, 'authentication.use_cas_sso', false);
            const url = this._oa_find(this.$store.state.global_config, 'authentication.cas_sso.base');
            const service = this._oa_find(this.$store.state.global_config, 'authentication.cas_sso.service');

            if (use_cas_sso && url && service) {
                return `${url}/login?service=${encodeURIComponent(service)}`;
            }
            return null;
        },
    },
};
