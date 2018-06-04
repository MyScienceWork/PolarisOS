const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const moment = require('moment');

module.exports = {
    mixins: [LangMixin, ReaderMixin],
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
                },
            },
        }));
    },
    computed: {
        discussions() {
            const content = this.mcontent(this.state.sinks.reads.forum_discussion);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
    },
};
