const Messages = require('../../../common/api/messages');
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
        mapping_object: {
            get() {
                const content = this.fcontent(this.state.sinks.creations.entity);
                if ('mapping' in content) {
                    try {
                        return JSON.parse(content.mapping);
                    } catch (err) {
                        return null;
                    }
                }
                return null;
            },
            set(mapping) {
                this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                    form: this.state.sinks.creations.entity,
                    name: 'mapping',
                    info: JSON.stringify(mapping, null, 4),
                });
            },
        },
        mapping_name() {
            const content = this.fcontent(this.state.sinks.creations.entity);

            if ('type' in content) {
                return content.type;
            }
            return '__dummy__';
        },
    },
};
