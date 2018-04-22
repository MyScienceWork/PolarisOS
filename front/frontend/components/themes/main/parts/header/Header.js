const Navbar = require('../navbar/Navbar.vue');
const LangMixin = require('../../../../../../common/mixins/LangMixin');
const Auth = require('../../../../../../common/utils/auth');
const Browser = require('../../../../../../common/utils/browser');

module.exports = {
    mixins: [LangMixin],
    props: {
        menu: { type: Object, required: true },
    },
    components: {
        navbar: Navbar,
    },
    methods: {
    },
    computed: {
        languages() {
            return this.$store.state.global_config.langs.map(l => l.value);
        },
    },
};
