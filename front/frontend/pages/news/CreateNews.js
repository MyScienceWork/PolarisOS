const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        news: APIRoutes.entity('news', 'POST', true),
                        news_forms: APIRoutes.entity('form', 'POST', true),
                    },
                    creations: {
                        news: APIRoutes.entity('news', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        news: 'news_read',
                        news_forms: 'news_forms_read',
                    },
                    creations: {
                        news: 'news_creation',
                    },
                },
            },
        };
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.news_forms,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.news_forms,
            path: this.state.paths.reads.news_forms,
            body: {
                where: {
                    name: ['news_form'],
                },
            },
        });
    },
    computed: {
        news_form() {
            const content = this.fcontent(this.state.sinks.reads.news_forms);
            if (!(content instanceof Array) || content.length === 0) {
                return () => [];
            }
            if (content.length > 0) {
                return content[0];
            }
            return [];
        },
    },
};
