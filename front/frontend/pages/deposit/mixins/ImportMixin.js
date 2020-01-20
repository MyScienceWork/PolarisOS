const FormMixn = require('../../../../common/mixins/FormMixin');
const APIRoutes = require('../../../../common/api/routes');
const Messages = require('../../../../common/api/messages');

module.exports = {
    mixins: [FormMixn],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        import: 'importer_read',
                    },
                    creations: {
                        import: 'importer_id_creation',
                        specs: 'publication_specs',
                    },
                },
                import_in_progress: false,
                import_state: 'nothing',
            },
        };
    },
    methods: {
        import_from_id() {
            const content = this.fcontent(this.state.sinks.creations.import);
            if (!content || !('import_id' in content)
                || content.import_id.trim() === '') {
                return;
            }

            this.$store.dispatch('fetch', {
                path: APIRoutes.import(),
                method: 'POST',
                action: 'read',
                form: this.state.sinks.reads.import,
                body: {
                    // TODO remove hack
                    info: content.import_id.trim(),
                    type: 'doi',
                },
            });
            this.state.import_state = 'loading';
        },
        handle_import(sink, creationSink) {
            if (sink !== this.state.sinks.reads.import) {
                return;
            }
            const content = this.fcontent(sink);
            if (Object.keys(content).length === 0) {
                this.state.import_state = 'fail';
            } else {
                this.state.import_state = 'success';
                const contentForm = this.fcontent(creationSink);
                content.type = contentForm.type;
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: creationSink,
                    body: content,
                });
            }
        },
        acknowledge_import_error(sink) {
            if (sink !== this.state.sinks.reads.import) {
                return;
            }
            this.state.import_state = 'fail';
        },
    },
    watch: {
        current_state_import(s) {
            this.dispatch(s, this, this.state.sinks.reads.import);
        },
    },
    computed: {
        current_state_import() {
            return this.fstate(this.state.sinks.reads.import);
        },
        import_form() {
            const content = this.fcontent(this.state.sinks.creations.specs);
            if ('fields' in content) {
                return Object.assign({}, content, { fields: content.fields.filter(field =>
                    field.name === 'import' && field.type === 'subform') });
            }
            return content;
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.import,
        });
        this.state.import_state = 'nothing';
    },
};
