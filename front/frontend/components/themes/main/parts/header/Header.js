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
    data() {
        return {
            showNavbar: true,
            lastScrollPosition: 0,
        };
    },
    components: {
        navbar: Navbar,
        search: Search,
        searchbar: SearchBar,
    },
    methods: {
        onScroll() {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollPosition < 0) {
                return;
            }
            // Stop executing this function if the difference between
            // current scroll position and last scroll position is less than some offset
            if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 135) {
                return;
            }
            this.showNavbar = currentScrollPosition < this.lastScrollPosition;
            this.lastScrollPosition = currentScrollPosition;
        },
    },
    computed: {
        languages() {
            return this.$store.state.global_config.langs.map(l => l.value);
        },
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    },
};
