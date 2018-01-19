const Navbar = require('../navbar/Navbar.vue');
const LangMixin = require('../../../../../../common/mixins/LangMixin');
const Auth = require('../../../../../../common/utils/auth');

module.exports = {
    mixins: [LangMixin],
    components: {
        navbar: Navbar,
    },
    methods: {
        logout() {
            Auth.logout();
            this.$router.push({ path: '/' });
        },
    },
    computed: {
        fullname() {
            return Auth.fullname();
        },
    },
};
