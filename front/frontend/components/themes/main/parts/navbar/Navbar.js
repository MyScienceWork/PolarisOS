const _ = require('lodash');
const LangMixin = require('../../../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
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
            const index = _.findIndex(this.menu.elements, r => this.$route.path === r.$route);

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
