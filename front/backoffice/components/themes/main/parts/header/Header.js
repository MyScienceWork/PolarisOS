const Navbar = require('../navbar/Navbar.vue');

const LangMixin = require('../../../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    components: {
        navbar: Navbar,
    },
    computed: {
        languages() {
            return this.$store.state.global_config.langs.map(l => l.value);
        },
    },
};
