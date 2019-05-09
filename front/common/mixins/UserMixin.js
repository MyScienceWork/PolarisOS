const Auth = require('../utils/auth');
const OAMixin = require('../mixins/ObjectAccessMixin');
const Browser = require('../utils/browser');

module.exports = {
    mixins: [OAMixin],
    computed: {
        user() {
            const u = Auth.user();
            if (u.firstname && u.lastname && !u.fullname) {
                u.fullname = `${u.firstname} ${u.lastname}`;
            }
            return u;
        },
        my_user() {
            const u = Auth.user();
            if (u.firstname && u.lastname && !u.fullname) {
                u.fullname = `${u.firstname} ${u.lastname}`;
            }
            return u;
        },
        fullname() {
            return this.user ? this.user.fullname : 'Default User';
        },
        user_id() {
            return Auth.user_id();
        },
        my_user_id() {
            return Auth.user_id();
        },
        avatar() {
            if (this.user && this.user.avatar && this.user.avatar.trim() !== '') {
                return `/public/front/imgs/avatars/${this.user.avatar}`;
            }
            return '/public/front/imgs/icons/person-placeholder.png';
        },
        roles() {
            if (!this.user) {
                return {};
            }

            return this.user.roles.reduce((obj, role) => {
                obj[role._id.id] = role._id;
                return obj;
            }, {});
        },
        author() {
            if (!this.user) {
                return null;
            }

            return this.user.author;
        },
        my_author() {
            if (!this.my_user) {
                return null;
            }

            return this.my_user.author;
        },
    },
    methods: {
        redirect_to_cas(url) {
            window.location.href = url;
            // window.location.reload();
        },
        generate_cas_sso_url(redirect, backoffice, logout = false) {
            const use_cas_sso = this._oa_find(this.$store.state.global_config, 'authentication.use_cas_sso', false);
            const url = this._oa_find(this.$store.state.global_config, 'authentication.cas_sso.base');
            let service = this._oa_find(this.$store.state.global_config, 'authentication.cas_sso.service');

            if (backoffice) {
                service += '/admin/login';
            } else {
                service += '/login';
            }

            if (use_cas_sso && url && service) {
                let service_redirection = service;

                if (redirect && !logout) {
                    service_redirection = `${service}?redirect=${encodeURIComponent(redirect)}`;
                }

                if (logout) {
                    return `${url}/logout?service=${encodeURIComponent(redirect)}`;
                }
                return `${url}/login?service=${encodeURIComponent(service_redirection)}`;
            }
            return null;
        },
        logout(backoffice) {
            const is_sso = this.user.sso;
            Auth.logout();
            if (is_sso) {
                const url = Browser.getURLHost(window.location);
                this.redirect_to_cas(this.generate_cas_sso_url(url, backoffice, true));
            } else {
                this.$router.push({ path: '/login' });
                location.reload();
            }
        },
        change_language(lang) {
            Browser.localSet('default_lang', lang);
            location.reload();
        },
    },
};
