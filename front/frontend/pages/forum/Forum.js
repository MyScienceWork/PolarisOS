const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const Messages = require('../../../common/api/messages');
const moment = require('moment');
const _ = require('lodash');

module.exports = {
    mixins: [LangMixin, ReaderMixin, UserMixin, FormMixin],
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
                statuses: {
                    creations: {
                        user: 'nc',
                        author: 'nc',
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
        show_success_read(sink) {
            if (sink === this.state.sinks.reads.forum_discussion) {
                const content = this.fcontent(sink);

                let body = {};
                if (content instanceof Array) {
                    console.log(content[0]);
                    body = content.length > 0 ? _.cloneDeep(content[0]) : {};
                } else {
                    console.log(content);
                    body = _.cloneDeep(content);
                }
                body.comments = {};
                body.comments.author = this.user_id;
                body.comments.createdAt = moment();
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: this.state.sinks.creations.forum_discussion,
                    body,
                });
            }
        },
        show_succes(sink) {
            if (sink === this.state.sinks.creations.forum_discussion) {
                this.state.statuses.creations.forum_discussion = 'ok';
            }
            setTimeout(() => {
                this.state.statuses.creations.forum_discussion = 'nc';
            }, 30000);
        },
        show_error(sink) {
            if (sink === this.state.sinks.creations.forum_discussion) {
                this.state.statuses.creations.forum_discussion = 'nok';
            }
            setTimeout(() => {
                this.state.statuses.creations.forum_discussion = 'nc';
            }, 10000);
        },
        send() {
            this.show_success_read(this.state.sinks.reads.forum_discussion);
            this.$store.dispatch('update', {
                form: this.state.sinks.creations.forum_discussion,
                path: this.state.paths.creations.forum_discussion,
                body: this.fcontent(this.state.sinks.creations.forum_discussion),
            });
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
        current_state_creation_user(s) {
            this.dispatch(s, this, this.state.sinks.creations.forum_discussion);
        },
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
