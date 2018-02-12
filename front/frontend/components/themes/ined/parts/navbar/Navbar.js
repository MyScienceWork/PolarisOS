const _ = require('lodash');
const LangMixin = require('../../../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {
                routes: this.$router.options.routes.filter(r => r.navbar),
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
    },
    mounted() {
        /* console.log(this.$route);
        console.log(this.$router.options.routes);
        console.log(this.active_idx, this.state.colors);*/
    },
};
