const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const Messages = require('../../../common/api/messages');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        faq: APIRoutes.entity('faq', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        faq: 'faq_read',
                    },
                },
            },
        };
    },
    components: {
    },
    methods: {

    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.faq,
            keepContent: false,
        });

        this.$store.dispatch('single_read', {
            form: this.state.sinks.reads.faq,
            path: this.state.paths.reads.faq,
        });
    },
    computed: {
        content_faq() {
            const content = this.fcontent(this.state.sinks.reads.faq);
            if (!(content instanceof Array)) {
                return [];
            }
            return content;
        },
    },
};
