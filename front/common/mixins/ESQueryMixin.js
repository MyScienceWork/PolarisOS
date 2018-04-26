const APIRoutes = require('../api/routes');
const FormMixin = require('./FormMixin');

module.exports = {
    mixins: [FormMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        query_grabber: 'query_grabber_read',
                    },
                },
                paths: {
                    reads: {
                        query_grabber: APIRoutes.entity('query', 'POST', true),
                    },
                },
                es_query_id: '',
            },
        };
    },
    methods: {
    },
    computed: {
        es_query() {
            const content = this.fcontent(this.state.sinks.reads.query_grabber);
            if (content && content instanceof Array && content.length > 0) {
                return content[0];
            }
            return null;
        },
        es_query_content() {
            if (this.es_query) {
                // WARN TODO
                // Content is already stringified!
                return this.es_query.content;
            }
            return JSON.stringify({});
        },
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.query_grabber,
            path: this.state.paths.reads.query_grabber,
            body: {
                where: {
                    id: this.state.es_query_id,
                },
            },
        });
    },
};
