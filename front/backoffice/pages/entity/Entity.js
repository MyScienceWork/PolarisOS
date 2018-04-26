const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormCleanerMixin, ESQueryMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        entity: APIRoutes.entity('entity', 'POST', true),
                        pipeline: APIRoutes.entity('pipeline', 'POST', true),
                        form: APIRoutes.entity('form', 'POST', true),
                    },
                    creations: {
                        entity: APIRoutes.entity('entity', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        entity: 'entity_read',
                        pipeline: 'pipeline_read',
                        form: 'form_read',
                    },
                    creations: {
                        entity: 'entity_creation',
                        search: 'entity_creation_search',
                    },
                },
                selected_types: {},
                es_query_id: 'backoffice-entity-query',
            },
        };
    },
    methods: {
    },
    mounted() {
        ['pipeline', 'form'].forEach((e) => {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    projection: ['name'],
                    size: 10000,
                },
            });
        });
    },
    computed: {
        forms() {
            return this.mcontent(this.state.sinks.reads.form);
        },
        pipelines() {
            return this.mcontent(this.state.sinks.reads.pipeline);
        },
    },
};
