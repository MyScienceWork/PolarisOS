module.exports = {
    data() {
        return {
            state: {
                query: this.$route.query || {},
            },
        };
    },
    methods: {
        post_hook_query_changed(q) {
            // TODO May be reimplemented;
        },
    },
    watch: {
        query(q) {
            this.state.query = q;
            this.post_hook_query_changed(q);
        },
    },
    computed: {
        query() {
            return this.$route.query;
        },
    },
};
