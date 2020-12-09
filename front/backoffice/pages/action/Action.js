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
                    },
                    creations: {
                        action: APIRoutes.entity('action', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        action: 'action_read',
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
};
