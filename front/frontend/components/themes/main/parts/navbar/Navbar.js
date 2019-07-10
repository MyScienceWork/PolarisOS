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
            state: {
                colors: ['red', 'red', 'red', 'red', 'red', 'red'],
            },
        };
    },
    methods: {
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
            const index = _.findIndex(this.menu.elements, r => this.$route.path === r.$route);
            if (index === -1) {
                return -1;
            }

            const info = this.menu.elements[index];
            if (info) {
                return index;
            }
            return -1;
        },
    },
    beforeMount() {
    },
};
