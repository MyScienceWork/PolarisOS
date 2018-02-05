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
                        template: APIRoutes.entity('template', 'GET'),
                        page: APIRoutes.entity('page', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        widget: 'widget_read',
                        template: 'template_read',
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
        Object.keys(this.state.sinks.reads).forEach((sink) => {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads[sink],
                keepContent: false,
            });
        });

        Object.keys(this.state.sinks.reads).forEach((sink) => {
            this.$store.state.requests.push({
                name: 'single_read',
                content: {
                    form: this.state.sinks.reads[sink],
                    path: this.state.paths.reads[sink],
                },
            });
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
        error_template(n) {
            return this.mwerror(this.state.sinks.reads.template)(n);
        },
        current_read_state_template(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.template)(s);
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

        content_template() {
            const content = this.mcontent(this.state.sinks.reads.template);
            return content;
        },
        length_template() {
            return this.mlength(this.state.sinks.reads.template);
        },
        error_template() {
            return this.merror(this.state.sinks.reads.template);
        },
        current_read_state_template() {
            return this.mcurrent_read_state(this.state.sinks.reads.template);
        },
    },
};
