const LangMixin = require('../../../../../../common/mixins/LangMixin');
const Auth = require('../../../../../../common/utils/auth');
const Browser = require('../../../../../../common/utils/browser');
const SearchBar = require('../../../../../../common/components/main/search_bar/SearchBar.vue');

const Navbar = require('../navbar/Navbar.vue');
const Search = require('../../../../../pages/home/subcomponents/Search.vue');

module.exports = {
    mixins: [LangMixin],
    props: {
        menu: { type: Object, required: true },
    },
    components: {
        navbar: Navbar,
        searchbar: SearchBar,
    },
    methods: {
    },
    computed: {
        languages() {
            return this.$store.state.global_config.langs.map(l => l.value);
        },
    },
};
