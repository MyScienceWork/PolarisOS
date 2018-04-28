const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
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
            },
        };
    },
    methods: {
    },
    mounted() {
    },
    computed: {
        search_query() {
            return JSON.stringify({
                $or: [
                    { id: '{{search}}' },
                    { name: '{{search}}' },
                ],
            });
        },
    },
};
