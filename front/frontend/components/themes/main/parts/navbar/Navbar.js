const _ = require('lodash');
const LangMixin = require('../../../../../../common/mixins/LangMixin');
const Search = require('../../../../../pages/home/subcomponents/Search.vue');

module.exports = {
    mixins: [LangMixin],
    components: {
        search: Search,
    },
    props: {
        menu: { type: Object, required: true },
    },
    data() {
        return {
            state: {
                colors: ['red', 'purple', 'orange', 'blue', 'brown', 'green'],
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
