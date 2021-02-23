const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const ImporterTypes = require('../../../common/lists/importer_types');
const ImporterFilesFormat = require('../../../common/lists/importer_files_format');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                itemsPerPage: 1000,
                itemsPerRow: 1,
                importer_type: null,
                importer_file_format: null,
                paths: {
                    creations: {
                        importer: APIRoutes.entity('importer', 'POST'),
                    },
                    reads: {
                        importer: APIRoutes.entity('importer', 'GET'),
                        entity: APIRoutes.entity('entity', 'GET'),
                        pipeline: APIRoutes.entity('pipeline', 'GET'),
                        connector: APIRoutes.entity('connector', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        importer: 'importer_read',
                        entity: 'entity_read',
                        pipeline: 'pipeline_read',
                        connector: 'connector_read',
                    },
                    creations: {
                        importer: 'importer_creation',
                    },
                },
            },
        };
    },
    methods: {
        change_importer_type(val) {
            if (val == null) {
                this.state.importer_type = null;
            } else {
                this.state.importer_type = val.value;
            }
        },
        change_importer_file_format(val) {
            if (val == null) {
                this.state.importer_file_format = null;
            } else {
                this.state.importer_file_format = val.value;
            }
        },
    },
    mounted() {
        Object.keys(this.state.sinks.reads).forEach((sink) => {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads[sink],
                keepContent: false,
            });

            this.$store.state.requests.push({
                name: 'single_read',
                content: {
                    form: this.state.sinks.reads[sink],
                    path: this.state.paths.reads[sink],
                },
            });
        });
    },
    watch: {
        error_importer(n) {
            return this.mwerror(this.state.sinks.reads.importer)(n);
        },
        current_read_state_importer(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.importer)(s);
        },
        error_connector(n) {
            return this.mwerror(this.state.sinks.reads.connector)(n);
        },
        current_read_state_connector(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.connector)(s);
        },
        error_entity(n) {
            return this.mwerror(this.state.sinks.reads.entity)(n);
        },
        current_read_state_entity(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.entity)(s);
        },
        error_pipeline(n) {
            return this.mwerror(this.state.sinks.reads.pipeline)(n);
        },
        current_read_state_pipeline(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.pipeline)(s);
        },
    },
    computed: {
        content_importer() {
            const content = this.mcontent(this.state.sinks.reads.importer);
            return content;
        },
        length_importer() {
            return this.mlength(this.state.sinks.reads.importer);
        },
        read_content_importer() {
            const content = this.content_importer;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_importer() {
            return this.merror(this.state.sinks.reads.importer);
        },
        current_read_state_importer() {
            return this.mcurrent_read_state(this.state.sinks.reads.importer);
        },

        content_connector() {
            const content = this.mcontent(this.state.sinks.reads.connector);
            return content;
        },
        length_connector() {
            return this.mlength(this.state.sinks.reads.connector);
        },
        error_connector() {
            return this.merror(this.state.sinks.reads.connector);
        },
        current_read_state_connector() {
            return this.mcurrent_read_state(this.state.sinks.reads.connector);
        },

        content_entity() {
            const content = this.mcontent(this.state.sinks.reads.entity);
            return content;
        },
        length_entity() {
            return this.mlength(this.state.sinks.reads.entity);
        },
        error_entity() {
            return this.merror(this.state.sinks.reads.entity);
        },
        current_read_state_entity() {
            return this.mcurrent_read_state(this.state.sinks.reads.entity);
        },

        content_pipeline() {
            const content = this.mcontent(this.state.sinks.reads.pipeline);
            return content;
        },
        length_pipeline() {
            return this.mlength(this.state.sinks.reads.pipeline);
        },
        error_pipeline() {
            return this.merror(this.state.sinks.reads.pipeline);
        },
        current_read_state_pipeline() {
            return this.mcurrent_read_state(this.state.sinks.reads.pipeline);
        },
        types() {
            return ImporterTypes;
        },
        files_format() {
            return ImporterFilesFormat;
        },
    },
};
