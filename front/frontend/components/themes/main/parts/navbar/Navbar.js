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
            // this.menu.elements.map(elt => console.log(elt));
            // console.log(`route::${this.$route.path}`);
            const index = _.findIndex(this.menu.elements, (r) => {
                console.log(r.$route);
                return this.$route.path === r.$route;
            });
            // console.log(`index::${index}`);
            if (index === -1) {
                return index;
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
