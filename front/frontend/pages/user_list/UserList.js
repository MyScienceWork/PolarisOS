const _ = require('lodash');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const LangMixin = require('../../../common/mixins/LangMixin');
// const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const OAMixin = require('../../../common/mixins/ObjectAccessMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
// const PaginationSearchMixin = require('../../../common/mixins/PaginationSearchMixin');
const SearchResults = require('../browse/subcomponents/SearchResults.vue');
const SearchBar = require('../browse/subcomponents/SearchBar.vue');

module.exports = {
    mixins: [LangMixin, FormCleanerMixin, OAMixin, ESQueryMixin],
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
                        users: 'users_read',
                    },
                },
                paths: {
                    creations: {
                        search: APIRoutes.entity('author', 'POST', true),
                    },
                    reads: {
                        users: APIRoutes.entity('author', 'POST', true),
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
        users() {
            const content = this.fcontent(this.state.sinks.reads.users);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
    },
    mounted() {
        this.$store.state.requests = ['users'].map(e => ({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 20,
                },
            },
        }));
    },
};
