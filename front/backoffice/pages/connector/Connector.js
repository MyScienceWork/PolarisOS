const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const ApiTypes = require('../../../common/lists/api_types');
const ApiProtocols = require('../../../common/lists/api_protocols');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                itemsPerPage: 1000,
                itemsPerRow: 1,
                paths: {
                    creations: {
                        connector: APIRoutes.entity('connector', 'POST'),
                    },
                    reads: {
                        connector: APIRoutes.entity('connector', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        connector: 'connector_read',
                    },
                    creations: {
                        connector: 'connector_creation',
                    },
                },
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.connector,
            keepContent: false,
        });

        this.$store.state.requests.push({
            name: 'single_read',
            content: {
                form: this.state.sinks.reads.connector,
                path: this.state.paths.reads.connector,
            },
        });
    },
    watch: {
        error_connector(n) {
            return this.mwerror(this.state.sinks.reads.connector)(n);
        },
        current_read_state_connector(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.connector)(s);
        },
    },
    computed: {
        content_connector() {
            const content = this.mcontent(this.state.sinks.reads.connector);
            return content;
        },
        length_connector() {
            return this.mlength(this.state.sinks.reads.connector);
        },
        read_content_connector() {
            const content = this.content_connector;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_connector() {
            return this.merror(this.state.sinks.reads.connector);
        },
        current_read_state_connector() {
            return this.mcurrent_read_state(this.state.sinks.reads.connector);
        },
        types() {
            return ApiTypes;
        },
        protocols() {
            return ApiProtocols;
        },
    },
};
