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
                        project_state: APIRoutes.entity('project_state', 'POST', true),
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
                        project_state: 'project_state_read',
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
        /*
        update_entity_states_labels(entity) {
            if (entity) {
                this.$store.state.requests = [entity].map(e => ({
                    name: 'search',
                    type: 'dispatch',
                    content: {
                        form: this.state.sinks.reads.project_state,
                        path: APIRoutes.entity(e, 'POST', true),
                        body: {
                            size: 10000,
                        },
                    },
                }));
            }
        },
        */
        /*
        update_all_entity_states(steps) {
            if (steps && steps.length > 0) {
                steps.forEach((e) => {
                    console.log('e.entity_state : ', e.entity_state);
                    this.update_entity_states_labels(e.entity_state);
                });
            }
        },
        */
    },
    mounted() {
        ['entity', 'role', 'project_state'].forEach((e) => {
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
            return this.mcontent(this.state.sinks.reads.project_state);
        },
    },
};
