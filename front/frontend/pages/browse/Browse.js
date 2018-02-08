const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');

const BrowsingList = require('../../lists/browse');
const Category = require('./subcomponents/Category.vue');
const SearchResults = require('./subcomponents/SearchResults.vue');

module.exports = {
    mixins: [LangMixin, FormMixin],
    components: {
        Category,
        SearchResults,
    },
    data() {
        return {
            state: {
                pread_path: APIRoutes.entity('publication', 'POST', true),
                aread_path: APIRoutes.entity('author', 'POST', true),
                forms: {
                    asink: 'authors_sink',
                    arsink: 'authors_read_sink',
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
