const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const moment = require('moment');

module.exports = {
    mixins: [LangMixin, ReaderMixin, UserMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        forum_discussion: APIRoutes.entity('forum_discussion', 'POST', true),
                    },
                    creations: {
                        forum_discussion: APIRoutes.entity('forum_discussion', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        forum_discussion: 'forum_discussion_read',
                    },
                    creations: {
                        forum_discussion: 'forum_discussion_creation',
                    },
                },
            },
        };
    },
    components: {
    },
    methods: {
        date_format(date) {
            return moment(date).fromNow();
        },
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
                    population: ['creator'],
                    where: {
                        _id: this.$route.params.id,
                    },
                },
            },
        }));
    },
    watch: {

    },
    computed: {
        message() {
            const content = this.mcontent(this.state.sinks.reads.forum_discussion);
            if (content instanceof Array && content.length > 0) {
                return content[0];
            }
            return {};
        },
    },
};
