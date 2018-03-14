const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const Messages = require('../../../../common/api/messages');
const AdvancedSearchSpecs = require('../../../../common/specs/AdvancedSearchSpecs');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
    },
    data() {
        return {
            state: {
                more_options: false,
                search: '',
                showAdvanced: false,
                forms: {
                    ssink: 'search_sink',
                    collector_sink: 'search_collector_sink',
                },
            },
        };
    },
    methods: {
        trigger_click() {
            this.$store.commit(Messages.COLLECT, {
                form: this.state.forms.ssink,
            });
        },
        initialize() {
            this.send_information();
        },
        send_information() {
            const content = this.fcontent(this.state.forms.ssink);
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
                params.push(`sink=${encodeURIComponent(this.state.forms.ssink)}`);
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
            return this.fstate(this.state.forms.ssink);
        },
        specs() {
            return AdvancedSearchSpecs;
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this, this.state.forms.ssink);
        },
    },
};
