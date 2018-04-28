const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');

module.exports = {
    mixins: [ESQueryMixin, ReaderMixin, LangMixin, FormCleanerMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        query: 'query_creation',
                        search: 'search_creation_query',
                    },
                    reads: {
                        query: 'query_read',
                    },
                },
                paths: {
                    creations: {
                        query: APIRoutes.entity('query', 'POST'),
                    },
                    reads: {
                        query: APIRoutes.entity('query', 'POST', true),
                    },
                },
                es_query_id: 'backoffice-query-query',
            },
        };
    },
};
