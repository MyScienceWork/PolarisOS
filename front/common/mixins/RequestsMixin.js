module.exports = {
    methods: {
        async execute_requests() {
            const requests = this.$store.state.requests;
            if (requests.length === 0) {
                return;
            }

            for (const req of requests) {
                // Need to update req.content with information coming from form
                // TODO
                if (req.type === 'commit') {
                    this.$store.commit(req.name, req.content);
                } else {
                    await this.$store.dispatch(req.name, req.content);
                }
            }

            this.$store.state.requests = [];
        },
    },
};
