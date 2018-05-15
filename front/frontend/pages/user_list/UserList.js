// const _ = require('lodash');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const LangMixin = require('../../../common/mixins/LangMixin');
// const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const OAMixin = require('../../../common/mixins/ObjectAccessMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
// const PaginationSearchMixin = require('../../../common/mixins/PaginationSearchMixin');
// const SearchResults = require('../browse/subcomponents/SearchResults.vue');
// const SearchBar = require('../browse/subcomponents/SearchBar.vue');
const UsersSearching = require('./UsersSearching.vue');

module.exports = {
    mixins: [LangMixin, FormCleanerMixin, OAMixin, ESQueryMixin],
    components: {
        // SearchResults,
        // SearchBar,
        UsersSearching,
    },
    data() {
        return {
            state: {
                sinks: {
                    filter: [],
                    creations: {
                        search: 'user_list_search',
                    },
                    reads: {
                        authors: 'users_read',
                        // search: 'user_list_search',
                    },
                },
                paths: {
                    creations: {
                        search: APIRoutes.entity('author', 'POST', true),
                    },
                    reads: {
                        // users: APIRoutes.entity('author', 'POST', true),
                        authors: APIRoutes.entity('author', 'POST', true),
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
        // users() {
        //     const content = this.fcontent(this.state.sinks.reads.users);
        //     if (content instanceof Array) {
        //         return content;
        //     }
        //     return [];
        // },
    },
    mounted() {
        // this.$store.state.requests = ['authors'].map(e => ({
        //     name: 'search',
        //     type: 'dispatch',
        //     content: {
        //         form: this.state.sinks.reads[e],
        //         path: this.state.paths.reads[e],
        //         // body: {
        //         //     // size: this.state.seso.size,
        //         //     population: ['author'],
        //         //     where: {},
        //         // },
        //     },
        // }));
        // this.$store.dispatch('search', {
        //     form: this.state.sinks.reads.users,
        //     path: this.state.paths.reads.users,
        //     body: {
        //         population: ['author'],
        //         where: {},
        //     },
        // });
    },
};
