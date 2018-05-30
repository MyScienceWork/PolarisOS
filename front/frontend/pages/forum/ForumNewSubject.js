const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const FormMixin = require('../../../common/mixins/FormMixin');
// const FileAnalyzerMixin = require('../deposit/mixins/FileAnalyzerMixin');
// const FileDepositWidget = require('../deposit/subcomponents/FileDepositWidget.vue');

module.exports = {
    mixins: [LangMixin, FormMixin],
    components: {
        // FileDepositWidget,
    },
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        forum: APIRoutes.entity('forum_discussion', 'POST', true),
                        discipline: APIRoutes.entity('discipline', 'POST', true),
                        forum_forms: APIRoutes.entity('form', 'POST', true),
                    },
                    creations: {
                        forum: APIRoutes.entity('forum_discussion', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        forum: 'forum_read',
                        forum_forms: 'forum_forms_read',
                    },
                    creations: {
                        forum: 'forum_creation',
                    },
                },
            },
        };
    },
    methods: {
        analyze_from_file(filename) {
            this.$emit('analyze-from-file', filename);
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.forum_forms,
            keep_content: true,
        });

        // this.state.analyze_state = 'nothing';

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.forum_forms,
            path: this.state.paths.reads.forum_forms,
            body: {
                where: {
                    name: ['forum_front_deposit_files'],
                },
            },
        });
    },
    computed: {
        forum_forms() {
            const content = this.fcontent(this.state.sinks.reads.forum_forms);
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
