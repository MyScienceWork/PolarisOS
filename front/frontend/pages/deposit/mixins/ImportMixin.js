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
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.import,
        });
        this.state.import_state = 'nothing';
    },
};
