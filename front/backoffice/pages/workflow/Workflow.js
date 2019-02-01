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
        update_entity_states_labels() {
            const content_form = this.fcontent(this.state.sinks.creations.workflow);
            const entity_state = content_form.entity_state;
            if (entity_state) {
                this.state.entity_state = entity_state;
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads.entity_state,
                    path: APIRoutes.entity(entity_state, 'POST', true),
                    body: {
                        size: 10000,
                    },
                });
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
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
    },
};
