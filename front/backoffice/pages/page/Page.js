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
                        page: APIRoutes.entity('page', 'POST'),
                    },
                    reads: {
                        widget: APIRoutes.entity('widget', 'GET'),
                        page: APIRoutes.entity('page', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        widget: 'widget_read',
                        page: 'page_read',
                    },
                    creations: {
                        page: 'page_creation',
                    },
                },
            },
        };
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.page,
            keepContent: false,
        });

        this.$store.state.requests.push({
            name: 'single_read',
            content: {
                form: this.state.sinks.reads.page,
                path: this.state.paths.reads.page,
            },
        });

        this.$store.state.requests.push({
            name: 'single_read',
            content: {
                form: this.state.sinks.reads.widget,
                path: this.state.paths.reads.widget,
            },
        });
    },
    watch: {
        error_widget(n) {
            return this.mwerror(this.state.sinks.reads.widget)(n);
        },
        current_read_state_widget(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.widget)(s);
        },
        error_page(n) {
            return this.mwerror(this.state.sinks.reads.page)(n);
        },
        current_read_state_page(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.page)(s);
        },
    },
    computed: {
        content_page() {
            const content = this.mcontent(this.state.sinks.reads.page);
            return content;
        },
        length_page() {
            return this.mlength(this.state.sinks.reads.page);
        },
        read_content_page() {
            const content = this.content_page;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_page() {
            return this.merror(this.state.sinks.reads.page);
        },
        current_read_state_page() {
            return this.mcurrent_read_state(this.state.sinks.reads.page);
        },

        content_widget() {
            const content = this.mcontent(this.state.sinks.reads.widget);
            return content;
        },
        length_widget() {
            return this.mlength(this.state.sinks.reads.widget);
        },
        error_widget() {
            return this.merror(this.state.sinks.reads.widget);
        },
        current_read_state_widget() {
            return this.mcurrent_read_state(this.state.sinks.reads.widget);
        },
    },
};
