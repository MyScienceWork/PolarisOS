const _ = require('lodash');

const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const Queries = require('../../../common/specs/queries');

const SearchResults = require('../browse/subcomponents/SearchResults.vue');
const SearchBar = require('../browse/subcomponents/SearchBar.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin, UserMixin],
    components: {
        SearchBar,
        SearchResults,
    },
    data() {
        return {
            state: {
                paths: {
                    creations: {
                    //    search: APIRoutes.entity('publication', 'POST', true),
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
    // mounted() {
    //     if (this.$route.query.as && this.$route.query.as === 'advanced_search') {
    //         this.state.as = 'advanced_search';
    //     }
    // },
    methods: {

    },
    computed: {
        query() {
            return JSON.stringify(Queries.published_publication_search(this.user._id, this.author));
        },
        advanced_filters() {
            return Queries.published_publication_search(this.user._id, this.author).$and.slice(0, 3).map(a => JSON.stringify(a));
        },
        query_search() {
            return this.$route.query && this.$route.query.s ? this.$route.query.s.trim() : '';
        },
        show_advanced_search: {
            get() {
                return (this.$route.query && this.$route.query.show_advanced_search === 'advanced_search');
            },
            set(nv) {
                const q = _.cloneDeep(this.$route.query || {});

                if (!nv) {
                    delete q.show_advanced_search;
                } else {
                    q.show_advanced_search = 'advanced_search';
                }
                if (Object.keys(q).length === 0) {
                    this.$router.replace({ query: null });
                } else {
                    this.$router.replace({ query: q });
                }
            },
        },
    },
};
