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
                        action: APIRoutes.entity('action', 'POST', true),
                        mail_template: APIRoutes.entity('mail_template', 'POST', true),
                        entity: APIRoutes.entity('entity', 'POST', true),
                    },
                    creations: {
                        action: APIRoutes.entity('action', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        action: 'action_read',
                        mail_template: 'mail_template_read',
                        entity: 'entity_read',
                        entity_state: 'entity_state_read',
                    },
                    creations: {
                        search: 'action_creation_search',
                        action: 'action_creation',
                    },
                },
                selected_type: '',
                es_query_id: 'backoffice-action-query',
                entity_state: '',
            },
        };
    },
    methods: {
        action_types() {
            return [{ label: 'l_send_email', type: 'email' },
                { label: 'l_change_state', type: 'change_state' },
            ];
        },
        update_type(val) {
            this.state.selected_type = val.value;
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
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.mail_template,
            path: this.state.paths.reads.mail_template,
            body: {
                size: 10000,
            },
        });
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
        emails() {
            const content = this.fcontent(this.state.sinks.reads.mail_template);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
        entitys() {
            const content = this.mcontent(this.state.sinks.reads.entity);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
        entity_states() {
            const content = this.mcontent(this.state.sinks.reads.entity_state);
            if (content.length === 0 && this.fcontent(this.state.sinks.reads.action).length > 0) {
                const entity_state = this.fcontent(this.state.sinks.reads.action)[0].entity_state;
                this.update_entity_states_labels(entity_state);
            }
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
    },
};
