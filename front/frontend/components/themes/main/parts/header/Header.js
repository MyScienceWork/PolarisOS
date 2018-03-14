const Navbar = require('../navbar/Navbar.vue');
const LangMixin = require('../../../../../../common/mixins/LangMixin');
const Auth = require('../../../../../../common/utils/auth');
const Browser = require('../../../../../../common/utils/browser');

module.exports = {
    mixins: [LangMixin],
    components: {
        navbar: Navbar,
    },
    methods: {
        logout() {
            Auth.logout();
            this.$router.push({ path: '/' });
            location.reload();
        },
        change_language(lang, e) {
            e.preventDefault();
            Browser.localSet('default_lang', lang);
            location.reload();
        },
    },
    computed: {
        fullname() {
            return Auth.fullname();
        },
        user_id() {
            return Auth.user_id();
        },
    },
};
