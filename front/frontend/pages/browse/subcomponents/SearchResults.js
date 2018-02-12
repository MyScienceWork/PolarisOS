const Messages = require('../../../../common/api/messages');
const APIRoutes = require('../../../../common/api/routes');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {

    },
    data() {
        return {
            state: {
                export_type: '',
                sinks: {
                    reads: {
                        export: 'exporter_read',
                        search: 'search_read',
                    },
                },
            },
        };
    },
    methods: {
        export_format(format, e) {
            e.preventDefault();
            this.state.export_type = format;
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads.export,
                keepContent: false,
            });

            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.reads.export,
            });
        },
        send_information(sink) {
            if (sink !== this.state.sinks.reads.export) {
                return;
            }

            const content = this.fcontent(sink);
            this.$store.dispatch('create', {
                path: APIRoutes.export(),
                body: {
                    ids: Object.keys(content),
                    type: content.type || '',
                },
            });
        },
    },
    watch: {
        current_state_export(s) {
            this.dispatch(s, this, this.state.sinks.reads.export);
        },
    },
    computed: {
        content() {
            const content = this.fcontent(this.state.sinks.reads.search);
            if (!(content instanceof Array)) {
                return [];
            }
            return content;
        },
        current_state_export() {
            return this.fstate(this.state.sinks.reads.export);
        },
    },
};
