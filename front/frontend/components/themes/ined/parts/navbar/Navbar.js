const _ = require('lodash');

module.exports = {
    data() {
        return {
            state: {
                routes: this.$router.options.routes.filter(r => r.path !== '/'),
                colors: ['red', 'purple', 'orange', 'blue', 'brown', 'green'],
            },
        };
    },
    computed: {
        active_idx() {
            const routes = this.$router.options.routes;
            const index = _.findIndex(routes, r => r.path !== '/' && this.$route.path === r.path) - 1;

            if (index === -1) {
                return index;
            }

            const info = routes[index];
            if (info) {
                if (info.navbar) {
                    return index;
                }
            }
            return -1;
        },
    },
    mounted() {
        console.log(this.$route);
        console.log(this.$router.options.routes);
        console.log(this.active_idx, this.state.colors);
    },
};
