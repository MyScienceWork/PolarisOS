const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const Messages = require('../../../../common/api/messages');
const AdvancedSearchSpecs = require('../../../../common/specs/AdvancedSearchSpecs');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    props: {
        showAdvancedSearch: { type: Boolean, default: true },
        showFavorites: { type: Boolean, default: true },
        searchSink: { type: String, default: 'search_sink' },
    },
    data() {
        return {
            state: {
                more_options: false,
                search: '',
                showAdvanced: false,
                sinks: {
                    reads: {
                        collector_sink: 'search_collector_sink',
                    },
                },
            },
        };
    },
    methods: {
        trigger_click() {
            this.$store.commit(Messages.COLLECT, {
                form: this.searchSink,
            });
        },
        initialize() {
            this.send_information();
        },
        send_information() {
            const content = this.fcontent(this.searchSink);
            let search = '';

            const defined = 'search' in content && content.search && content.search.trim !== '';
            const extra_filters = 'pos_aggregate' in content;

            if (!defined && !extra_filters) {
                return;
            }

            search = content.search;

            const params = [];
            if (defined) {
                params.push(`s=${encodeURIComponent(search)}`);
            }

            if (extra_filters) {
                params.push(`sink=${encodeURIComponent(this.state.sinks.reads.ssink)}`);
            }

            const strings = params.reduce((arr, val) => {
                arr.push(val);
                return arr;
            }, []).join('&');
            const query = `/search?${strings}`;

            this.$router.push({ path: query });
        },
    },
    computed: {
        current_state() {
            return this.fstate(this.searchSink);
        },
        specs() {
            return AdvancedSearchSpecs;
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this, this.searchSink);
        },
    },
};
