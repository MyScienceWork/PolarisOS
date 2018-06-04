const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                itemsPerPage: 1000,
                itemsPerRow: 1,
                paths: {
                    creations: {
                        template: APIRoutes.entity('template', 'POST'),
                    },
                    reads: {
                        template: APIRoutes.entity('template', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        template: 'template_read',
                    },
                    creations: {
                        template: 'template_creation',
                    },
                },
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.template,
            keepContent: false,
        });

        this.$store.state.requests.push({
            name: 'single_read',
            content: {
                form: this.state.sinks.reads.template,
                path: this.state.paths.reads.template,
            },
        });
    },
    watch: {
        error_template(n) {
            return this.mwerror(this.state.sinks.reads.template)(n);
        },
        current_read_state_template(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.template)(s);
        },
    },
    computed: {
        content_template() {
            const content = this.mcontent(this.state.sinks.reads.template);
            return content;
        },
        length_template() {
            return this.mlength(this.state.sinks.reads.template);
        },
        read_content_template() {
            const content = this.content_template;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_template() {
            return this.merror(this.state.sinks.reads.template);
        },
        current_read_state_template() {
            return this.mcurrent_read_state(this.state.sinks.reads.template);
        },
    },
};
