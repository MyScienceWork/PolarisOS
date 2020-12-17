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
                    },
                    creations: {
                        action: APIRoutes.entity('action', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        action: 'action_read',
                        mail_template: 'mail_template_read',
                    },
                    creations: {
                        search: 'action_creation_search',
                        action: 'action_creation',
                    },
                },
                selected_types: {},
                es_query_id: 'backoffice-action-query',
            },
        };
    },
    methods: {
        action_types() {
            return [{ label: 'l_email', type: 'email' },
                    { label: 'l_change_state', type: 'change_state' }
            ];
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
    },
    computed: {
        emails() {
            const content = this.fcontent(this.state.sinks.reads.mail_template);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
    },
};
