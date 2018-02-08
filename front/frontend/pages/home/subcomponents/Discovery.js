const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const Messages = require('../../../../common/api/messages');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        navItems: { required: true, type: Array, default: () => [] },
    },
    data() {
        return {
            state: {
                more_options: false,
                search: '',
                forms: {
                    ssink: 'search_sink',
                    collector_sink: 'search_collector_sink',
                },
            },
        };
    },
    methods: {
        trigger_click(e) {
            if (e) {
                e.preventDefault();
            }
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
            if (!('search' in content)) {
                return;
            }

            search = content.search;
            this.$router.push({ path: `/search?s=${encodeURIComponent(search)}` });
        },
    },
    computed: {
        current_state() {
            return this.fstate(this.state.forms.ssink);
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this, this.state.forms.ssink);
        },
    },
};
