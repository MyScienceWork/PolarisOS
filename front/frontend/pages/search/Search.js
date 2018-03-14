const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const Queries = require('../../../common/specs/queries');

const SearchResults = require('../browse/subcomponents/SearchResults.vue');
const SearchBar = require('../browse/subcomponents/SearchBar.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    components: {
        SearchBar,
        SearchResults,
    },
    data() {
        return {
            state: {
                paths: {
                    creations: {
                        search: APIRoutes.entity('publication', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        search: 'search_read',
                    },
                    creations: {
                        search: 'search_creation',
                    },
                },
            },
        };
    },
    methods: {

    },
    computed: {
        query() {
            return JSON.stringify(Queries.publication_search);
        },
        query_search() {
            return this.$route.query && this.$route.query.s ? this.$route.query.s.trim() : '';
        },
    },
};
