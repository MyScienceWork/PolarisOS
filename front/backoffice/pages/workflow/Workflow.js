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
                        workflow: APIRoutes.entity('workflow', 'POST', true),
                    },
                    creations: {
                        workflow: APIRoutes.entity('workflow', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        workflow: 'workflow_read',
                    },
                    creations: {
                        workflow: 'workflow_creation',
                        search: 'workflow_creation_search',
                    },
                },
                selected_types: {},
                es_query_id: 'backoffice-workflow-query',
            },
        };
    },
    methods: {
    },
    mounted() {
    },
    computed: {
    },
};
