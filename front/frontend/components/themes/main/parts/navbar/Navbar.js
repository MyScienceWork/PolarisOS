const _ = require('lodash');
const LangMixin = require('../../../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {
                routes: [],
                colors: ['red', 'purple', 'orange', 'blue', 'brown', 'green'],
            },
        };
    },
    computed: {
        active_idx() {
            const index = _.findIndex(this.state.routes, r => this.$route.path === r.path);

            if (index === -1) {
                return index;
            }

            const info = this.state.routes[index];
            if (info) {
                return index;
            }
            return -1;
        },
        routes() {
        },
    },
    beforeMount() {
        const rs = this.$router.options.routes.filter(r => r.navbar);
        rs.sort((r1, r2) => (r1.meta.menu_item - r2.meta.menu_item));
        this.state.routes = rs;
    },
};
