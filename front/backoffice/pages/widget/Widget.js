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
                        widget: APIRoutes.entity('widget', 'POST'),
                    },
                    reads: {
                        widget: APIRoutes.entity('widget', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        widget: 'widget_read',
                    },
                    creations: {
                        widget: 'widget_creation',
                    },
                },
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.widget,
            keepContent: false,
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
    },
    computed: {
        content_widget() {
            const content = this.mcontent(this.state.sinks.reads.widget);
            return content;
        },
        length_widget() {
            return this.mlength(this.state.sinks.reads.widget);
        },
        read_content_widget() {
            const content = this.content_widget;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_widget() {
            return this.merror(this.state.sinks.reads.widget);
        },
        current_read_state_widget() {
            return this.mcurrent_read_state(this.state.sinks.reads.widget);
        },
    },
};
