const _ = require('lodash');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const OAMixin = require('../../../common/mixins/ObjectAccessMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');

const SearchResults = require('../browse/subcomponents/SearchResults.vue');
const SearchBar = require('../browse/subcomponents/SearchBar.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin, OAMixin, ESQueryMixin],
    components: {
        SearchResults,
        SearchBar,
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        search: 'user_list_search',
                    },
                    reads: {
                    },
                },
                paths: {
                    creations: {
                    },
                    reads: {
                    },
                },
                es_query_ids: ['frontoffice-userlist-default-query', 'frontoffice-userlist-query'],
            },
        };
    },
    methods: {
    },
    watch: {
    },
    computed: {
    },
    mounted() {
    },
};
