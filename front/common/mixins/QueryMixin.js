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
        query(q, old) {
            this.state.query = q;
            this.post_hook_query_changed(q, old);
        },
    },
    computed: {
        query() {
            return this.$route.query;
        },
    },
};
