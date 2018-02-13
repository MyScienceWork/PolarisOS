const Handlebars = require('handlebars');
const Messages = require('../../../../common/api/messages');
const APIRoutes = require('../../../../common/api/routes');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        searchQuery: { required: true, type: String },
    },
    data() {
        return {
            state: {
                showAdvanced: false,
                paths: {
                    creations: {
                        search: APIRoutes.entity('publication', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        search: 'search_read',
                    },
                    creations: {
                        search: 'search_creation',
                    },
                },
            },
        };
    },
    methods: {
        search() {
            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.creations.search,
            });
        },
        send_information(sink) {
            if (sink !== this.state.sinks.creations.search) {
                return;
            }

            const content = this.fcontent(sink);
            this.$store.dispatch('search', {
                path: this.state.paths.creations.search,
                form: this.state.sinks.reads.search,
                body: {
                    where: JSON.parse(Handlebars.compile(this.searchQuery)(content)),
                },
            });
        },
    },
    watch: {
        current_state_search(s) {
            this.dispatch(s, this, this.state.sinks.creations.search);
        },
    },
    computed: {
        current_state_search() {
            return this.fstate(this.state.sinks.creations.search);
        },
        query_search() {
            const query = this.$route.query;

            if (!query) {
                return null;
            }

            const search = query.s;
            if (!search) {
                return null;
            }

            return search.trim();
        },
    },
    mounted() {
        const query = this.$route.query;

        if (!query) {
            return;
        }

        const search = query.s;
        if (!search) {
            return;
        }

        this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
            form: this.state.sinks.creations.search,
            body: {
                search,
            },
        });

        this.send_information(this.state.sinks.creations.search);
    },
};
