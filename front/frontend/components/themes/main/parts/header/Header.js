const LangMixin = require('../../../../../../common/mixins/LangMixin');
const Auth = require('../../../../../../common/utils/auth');
const Browser = require('../../../../../../common/utils/browser');

const Navbar = require('../navbar/Navbar.vue');
const Search = require('../../../../../pages/home/subcomponents/Search.vue');

module.exports = {
    mixins: [LangMixin],
    props: {
        menu: { type: Object, required: true },
    },
    components: {
        Navbar,
        Search,
    },
    methods: {
    },
    computed: {
        languages() {
            return this.$store.state.global_config.langs.map(l => l.value);
        },
    },
};
