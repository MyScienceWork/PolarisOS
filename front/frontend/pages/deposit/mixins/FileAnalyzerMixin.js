const APIRoutes = require('../../../../common/api/routes');
const Messages = require('../../../../common/api/messages');

module.exports = {
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        analyze: 'analyzer_read',
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
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.analyze,
        });
        this.state.analyze_state = 'nothing';
    },
};
