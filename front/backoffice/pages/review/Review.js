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
                    reads: {
                        publication: APIRoutes.entity('publication', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        publication: 'publication_read',
                    },
                },
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.publication,
            keepContent: false,
        });

        this.$store.state.requests.push({
            name: 'single_read',
            content: {
                form: this.state.sinks.reads.publication,
                path: this.state.paths.reads.publication,
            },
        });
    },
    watch: {
        error_publication(n) {
            return this.mwerror(this.state.sinks.reads.publication)(n);
        },
        current_read_state_publication(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.publication)(s);
        },
    },
    computed: {
        content_publication() {
            const content = this.mcontent(this.state.sinks.reads.publication);
            return content;
        },
        length_publication() {
            return this.mlength(this.state.sinks.reads.publication);
        },
        read_content_publication() {
            const content = this.content_publication;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_publication() {
            return this.merror(this.state.sinks.reads.publication);
        },
        current_read_state_publication() {
            return this.mcurrent_read_state(this.state.sinks.reads.publication);
        },
    },
};
