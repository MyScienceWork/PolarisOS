const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const PredefinedPages = require('../../../common/route_components');


module.exports = {
    mixins: [ReaderMixin, LangMixin, FormCleanerMixin, ESQueryMixin],
    data() {
        return {
            state: {
                paths: {
                    creations: {
                        page: APIRoutes.entity('page', 'POST'),
                    },
                    reads: {
                        widget: APIRoutes.entity('widget', 'GET'),
                        template: APIRoutes.entity('template', 'GET'),
                        page: APIRoutes.entity('page', 'POST', true),
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
                        search: 'page_creation_search',
                    },
                },
                es_query_id: 'backoffice-page-query',
            },
        };
    },
    mounted() {
        ['template', 'widget'].forEach((e) => {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads[e],
                keep_content: false,
            });
        });

        ['template', 'widget'].forEach((e) => {
            this.$store.state.requests.push({
                name: 'single_read',
                content: {
                    form: this.state.sinks.reads[e],
                    path: this.state.paths.reads[e],
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
        error_template(n) {
            return this.mwerror(this.state.sinks.reads.template)(n);
        },
        current_read_state_template(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.template)(s);
        },
    },
    computed: {
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
        predefined_pages() {
            const keys = Object.keys(PredefinedPages);
            return keys.map(k => ({
                label: this.lang(`l_${k}_page`),
                value: k,
            }));
        },
    },
};
