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
            const index = _.findIndex(this.$router.options.routes, r => r.path !== '/' && this.$route.path === r.path) - 1;
            return Math.max(-1, index);
        },
    },
    mounted() {
        console.log(this.$route);
        console.log(this.$router.options.routes);
        console.log(this.active_idx, this.state.colors);
    },
};
