const Messages = require('../../../../api/messages');
const APIRoutes = require('../../../../api/routes');
const FormMixin = require('../../../../mixins/FormMixin');
const LangMixin = require('../../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        hasFilter: { default: true, required: false, type: Boolean },
        searchQuery: { required: true, type: String },
        searchUrl: { required: true, type: String },
        filterSinks: { required: true, type: Object },
        searchSink: { required: true, type: String },
        itemsPerPage: { default: 20, type: Number },
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        search: 'search_creation',
                    },
                    reads: {
                        search: 'search_creation',
                    },
                },
            },
        };
    },
    methods: {
        search(e) {
            e.preventDefault();
            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.creations.search,
            });
        },
        send_information(sink) {
            if (sink !== this.state.sinks.creations.search) {
                return;
            }

            this.$store.dispatch('search', {
                form: this.searchSink,
                path: this.searchUrl,
                body: {
                    size: this.itemsPerPage,
                    where: {},
                },
            });
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this, this.state.sinks.creations.search);
        },
    },
    computed: {
        current_state() {
            return this.fstate(this.state.sinks.creations.search);
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.creations.search,
            keepContent: false,
        });
    },
};
