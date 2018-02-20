const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');

const BrowsingList = require('../../lists/browse');
const Category = require('./subcomponents/Category.vue');
const SearchResults = require('./subcomponents/SearchResults.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    components: {
        Category,
        SearchResults,
    },
    data() {
        return {
            state: {
                filters: [],
                sinks: {
                    creations: {
                        search: 'publication_browse_search',
                    },
                    reads: {
                        publication: 'publication_read',
                    },
                },
                paths: {
                    reads: {
                        publication: APIRoutes.entity('publication', 'POST', true),
                    },
                },
            },
        };
    },
    methods: {
    },
    computed: {
        navs() {
            return BrowsingList;
        },
    },
};
