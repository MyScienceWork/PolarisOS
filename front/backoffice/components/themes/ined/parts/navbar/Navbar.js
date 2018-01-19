const _ = require('lodash');

module.exports = {
    props: ['menus'],
    data() {
        return {
            isShown: false,
            state: {
                routes: this.$router.options.routes.filter(r => r.path !== '/'),
                colors: ['red', 'orange', 'purple', 'brown', 'green', 'blue'],
            },
        };
    },
    computed: {
        active_idx() {
            const index = _.findIndex(this.$router.options.routes, r => r.path !== '/' && this.$route.path === r.path) - 1;
            return Math.max(-1, index);
        },
    },
    methods: {
        show(e) {
            e.preventDefault();
            this.isShown = !this.isShown;
        },
    },
    mounted() {
    },
};
