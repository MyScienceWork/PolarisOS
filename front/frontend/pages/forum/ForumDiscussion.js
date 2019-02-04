const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
// const FormMixin = require('../../../common/mixins/FormMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const DiscussionsSearching = require('./DiscussionSearching.vue');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');

module.exports = {
    mixins: [LangMixin, ReaderMixin, FiltersMixin, ESQueryMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        forum_discussion: APIRoutes.entity('forum_discussion', 'POST', true),
                    },
                    creations: {
                        forum_discussion: APIRoutes.entity('forum_discussion', 'POST'),
                        search: APIRoutes.entity('forum_discussion', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        forum_discussion: 'forum_discussion_read',
                    },
                    creations: {
                        forum_discussion: 'forum_discussion_creation',
                        search: 'forum_discussion_search',
                    },
                },
                es_query_ids: ['frontoffice-discussion-query', 'frontoffice-discussion-default-query'],
            },
        };
    },
    components: {
        DiscussionsSearching,
    },
    methods: {
    },
    mounted() {
        this.$store.state.requests = ['forum_discussion'].map(e => ({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 10,
                    population: ['author'],
                    where: {},
                },
            },
        }));
    },
    computed: {
        discussions() {
            const content = this.mcontent(this.state.sinks.reads.forum_discussion);
            if (content instanceof Array) {
                return content.filter(elmt => (!elmt.authorAuthorized || elmt.authorAuthorized.indexOf(this.user_id) !== -1));
            }
            return [];
        },
    },
};
