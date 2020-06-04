const _ = require('lodash');
const LangMixin = require('../../../../../../common/mixins/LangMixin');
const UserMixin = require('../../../../../../common/mixins/UserMixin');
const Search = require('../../../../../pages/home/subcomponents/Search.vue');

module.exports = {
    mixins: [LangMixin, UserMixin],
    components: {
        search: Search,
    },
    props: {
        menu: { type: Object, required: true },
    },
    data() {
        return {
            showNavbar: true,
            lastScrollPosition: 0,
            state: {
                colors: ['red', 'red', 'red', 'red', 'red', 'red'],
            },
        };
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
        generate_route(item) {
            if (item.query && item.query.trim() !== '') {
                return `${item.$route}?${item.query}`;
            }
            return item.$route;
        },
        menu_filtered_with_roles() {
            const menu_elements = this.menu.elements;
            return menu_elements.filter((item_menu) => {
                const roles = item_menu.roles;
                if (roles.length === 0) {
                    return true;
                }
                return roles.some((role_menu) => {
                    const key = _.findKey(this.roles, role_user => role_user._id === role_menu._id);
                    return key !== undefined;
                });
            });
        },
    },
    computed: {
        active_idx() {
            if (this.$route.path === '/browse') {
                return 1;
            }
            const index = _.findIndex(this.menu_filtered_with_roles(), r => this.$route.path === r.$route);
            if (index === -1) {
                return -1;
            }

            const menu_filtered = this.menu_filtered_with_roles();
            const info = menu_filtered[index];
            if (info) {
                return index;
            }
            return -1;
        },
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    },
    beforeMount() {
    },
};
