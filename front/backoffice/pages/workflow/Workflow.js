const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const AccessMixin = require('../../../common/mixins/AccessMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormCleanerMixin, ESQueryMixin, AccessMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        role: APIRoutes.entity('role', 'POST', true),
                        workflow: APIRoutes.entity('workflow', 'POST', true),
                        entity: APIRoutes.entity('entity', 'POST', true),
                    },
                    creations: {
                        workflow: APIRoutes.entity('workflow', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        role: 'role_read',
                        workflow: 'workflow_read',
                        entity: 'entity_read',
                        entity_state_labels: 'entity_state_labels_read',
                    },
                    creations: {
                        workflow: 'workflow_creation',
                        search: 'workflow_creation_search',
                    },
                },
                es_query_id: 'backoffice-workflow-query',
            },
        };
    },
    methods: {
        update_entity_states_labels(entity) {
            if (entity && entity.label) {
                console.log('update_entity_states_labels : ', entity.label);
                [entity.label].forEach((e) => {
                    this.$store.dispatch('search', {
                        form: this.state.sinks.reads.entity_state_labels,
                        path: APIRoutes.entity(e, 'POST', true),
                        body: {
                            size: 10000,
                        },
                    });
                });
            }
        },
    },
    mounted() {
        this.$store.state.requests = ['role'].map(e => ({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 10000,
                },
            },
        }));
        ['entity'].forEach((e) => {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 10000,
                },
            });
        });
    },
    computed: {
        entitys() {
            return this.mcontent(this.state.sinks.reads.entity);
        },
        roles() {
            return this.mcontent(this.state.sinks.reads.role);
        },
        entity_states() {
            return this.mcontent(this.state.sinks.reads.entity_state_labels);
        },
    },
};
