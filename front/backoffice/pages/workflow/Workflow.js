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
                        entity_state: 'entity_state_read',
                    },
                    creations: {
                        workflow: 'workflow_creation',
                        search: 'workflow_creation_search',
                    },
                },
                es_query_id: 'backoffice-workflow-query',
                entity_state: '',
            },
        };
    },
    methods: {
        step_types() {
            return [{
                label: 'l_transition',
                type: 'transition',
            }, {
                label: 'l_step',
                type: 'step',
            }];
        },
        update_entity_states_labels(label) {
            if (label) {
                this.state.entity_state = label;
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads.entity_state,
                    path: APIRoutes.entity(label, 'POST', true),
                    body: {
                        size: 10000,
                    },
                });
            }
        },
        update_entity_states(entity) {
            if (entity && entity.label && this.state.entity_state !== entity.label) {
                this.update_entity_states_labels(entity.label);
            }
        },
    },
    mounted() {
        ['entity', 'role'].forEach((e) => {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 10000,
                },
            });
        });
    },
    watch: {
    },
    computed: {
        entitys() {
            const content = this.mcontent(this.state.sinks.reads.entity);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
        roles() {
            const content = this.mcontent(this.state.sinks.reads.role);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
        entity_states() {
            const content = this.mcontent(this.state.sinks.reads.entity_state);
            if (content.length === 0 && this.fcontent(this.state.sinks.reads.workflow).length > 0) {
                const entity_state = this.fcontent(this.state.sinks.reads.workflow)[0].entity_state;
                this.update_entity_states_labels(entity_state);
            }
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
    },
};
