const Auth = require('../utils/auth');
const Browser = require('../utils/browser');

module.exports = {
    computed: {
        user() {
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
    },
    methods: {
        logout() {
            Auth.logout();
            this.$router.push({ path: '/' });
            location.reload();
        },
        change_language(lang) {
            Browser.localSet('default_lang', lang);
            location.reload();
        },
    },
};
