const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const Messages = require('../../../../common/api/messages');
const AdvancedSearchSpecs = require('../../../../common/specs/AdvancedSearchSpecs');
const _ = require('lodash');
// const Vue = require('vue');

// Vue.use(_);

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    props: {
        showAdvancedSearch: { type: Boolean, default: true },
        showFavorites: { type: Boolean, default: true },
        collapsible: { type: Boolean, default: false },
        searchSink: { type: String, default: 'search_sink' },
    },
    data() {
        return {
            state: {
                as_query: _.merge({}, { as: 'advanced_search' }),
                collapse_opened: false,
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
            if (this.collapsible) {
                if (!this.state.collapse_opened) {
                    this.state.collapse_opened = !this.state.collapse_opened;
                    return;
                }
            }
            this.send_information(this.searchSink);
        },
        initialize() {
            this.send_information();
        },
        send_information(sink) {
            if (sink !== this.searchSink) {
                return;
            }

            if (this.collapsible) {
                this.state.collapse_opened = false;
            }

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
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.searchSink,
            keep_content: false,
        });
    },
};
