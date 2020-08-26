const APIRoutes = require('../../../../common/api/routes');
const Messages = require('../../../../common/api/messages');
const FormMixin = require('../../../../common/mixins/FormMixin');

module.exports = {
    mixins: [FormMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        analyze: 'analyzer_read',
                    },
                    creations: {
                        specs: 'dataset_specs',
                    },
                },
                analyze_in_progress: false,
                analyze_state: 'nothing',
            },
        };
    },
    methods: {
        analyze_from_file(filename) {
            this.$store.dispatch('fetch', {
                path: APIRoutes.import(),
                method: 'POST',
                action: 'read',
                form: this.state.sinks.reads.analyze,
                body: {
                    info: filename,
                    type: 'pdf',
                },
            });
            this.state.analyze_state = 'loading';
        },
        handle_analyzed_file(sink, creationSink) {
            if (sink !== this.state.sinks.reads.analyze) {
                return;
            }

            const content = this.fcontent(sink);
            if (Object.keys(content).length === 0) {
                this.state.analyze_state = 'fail';
            } else {
                this.state.analyze_state = 'success';
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: creationSink,
                    body: content,
                });
            }
        },
        acknowledge_analyze_error(sink) {
            if (sink !== this.state.sinks.reads.analyze) {
                return;
            }
            this.state.analyze_state = 'fail';
        },
    },
    watch: {
        current_state_analyze(s) {
            this.dispatch(s, this, this.state.sinks.reads.analyze);
        },
    },
    computed: {
        current_state_analyze() {
            return this.fstate(this.state.sinks.reads.analyze);
        },
        upload_form() {
            const content = this.fcontent(this.state.sinks.creations.specs);
            if ('fields' in content) {
                return Object.assign({}, content, { fields: content.fields.filter(field =>
                    field.name === 'upload' && field.type === 'subform') });
            }
            return content;
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.analyze,
        });
        this.state.analyze_state = 'nothing';
    },
};
