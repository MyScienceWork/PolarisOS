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
                        function: APIRoutes.entity('function', 'POST', true),
                    },
                    creations: {
                        function: APIRoutes.entity('function', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        function: 'function_read',
                    },
                    creations: {
                        search: 'function_creation_search',
                    },
                },
                selected_types: {},
                es_query_id: 'backoffice-function-query',
            },
        };
    },
};
