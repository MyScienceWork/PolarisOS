const Navbar = require('../navbar/Navbar.vue');

module.exports = {
    components: {
        navbar: Navbar,
    },
    computed: {
        languages() {
            return this.$store.state.global_config.langs.map(l => l.value);
        },
    },
};
