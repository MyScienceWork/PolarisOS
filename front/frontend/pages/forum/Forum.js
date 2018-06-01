const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const Messages = require('../../../common/api/messages');
const moment = require('moment');
const _ = require('lodash');

module.exports = {
    mixins: [LangMixin, ReaderMixin, UserMixin, FormCleanerMixin, FiltersMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        forum_discussion: APIRoutes.entity('forum_discussion', 'POST', true),
                        dropzone_form: APIRoutes.entity('form', 'POST', true),
                    },
                    creations: {
                        forum_discussion: APIRoutes.entity('forum_discussion', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        forum_discussion: 'forum_discussion_read',
                        dropzone_form: 'dropzone_form_read',
                    },
                    creations: {
                        forum_discussion: 'forum_discussion_creation',
                        new_comment: 'new_comment_creation',
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
        show_success_read(sink) {
            if (sink === this.state.sinks.reads.forum_discussion) {
                const content = this.fcontent(sink);

                let body = {};
                if (content instanceof Array) {
                    body = content.length > 0 ? _.cloneDeep(content[0]) : {};
                } else {
                    body = _.cloneDeep(content);
                }
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
            const new_comment = this.fcontent(this.state.sinks.creations.new_comment);
            new_comment.comments.author = this.user_id;
            new_comment.comments.createdAt = moment();
            const body = this.fcontent(this.state.sinks.creations.forum_discussion);
            if (!body.comments) {
                body.comments = [new_comment.comments];
            } else if (!body.comments.isArray) {
                const tmp = body.comments;
                body.comments = [];
                tmp.forEach((elmt) => {
                    body.comments.push(elmt);
                });
                body.comments.push(new_comment.comments);
            } else {
                body.comments.push(new_comment.comments);
            }
            this.$store.dispatch('update', {
                form: this.state.sinks.creations.forum_discussion,
                path: this.state.paths.creations.forum_discussion,
                body,
            });
            this.$store.commit(Messages.REMOVE_FORM, {
                form: this.state.sinks.creations.new_comment,
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
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.dropzone_form,
            path: this.state.paths.reads.dropzone_form,
            body: {
                where: {
                    name: ['forum_front_deposit_files'],
                },
            },
        });
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
        dropzone_forms() {
            const content = this.fcontent(this.state.sinks.reads.dropzone_form);
            if (!(content instanceof Array) || content.length === 0) {
                return () => [];
            }
            if (content.length > 0) {
                return content[0];
            }
            return content;
        },
    },
};
