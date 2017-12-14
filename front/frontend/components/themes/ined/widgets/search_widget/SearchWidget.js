const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');
const FormMixin = require('../../../../../../common/mixins/FormMixin');
const Messages = require('../../../../../../common/api/messages');

module.exports = {
    mixins: [WidgetMixin, FormMixin],
    props: {
        mode: { default: 'all', type: String },
        search_url: { required: true, type: String },
        redirect_to_search: { default: false, type: Boolean },
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
            const content = this.fform(this.state.forms.ssink);
            let search = '';
            if (!('search' in content)) {
                return;
            }

            search = content.search;

            if (this.redirect_to_search) {
                this.$router.push({ path: `/search?s=${encodeURIComponent(search)}` });
                return;
            }

            this.$store.dispatch('search', {
                form: this.state.forms.collector_sink,
                path: this.search_url,
                body: {
                    size: 500,
                    population: ['authors._id', 'journal', 'lang'],
                    where: {
                        $or: [
                            { 'titles.content': search },
                            { 'translated_titles.content': search },
                            { 'subtitles.content': search },
                            { 'abstracts.content': search },
                        ],
                    },
                },
            });
        },
    },
    computed: {
        current_state() {
            return this.fstate(this.state.forms.ssink);
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this);
        },
    },
    mounted() {
        const query = this.$route.query;
        if ('s' in query && query.s.trim() !== '') {
            this.$store.commit(Messages.READ, {
                content: { search: query.s.trim() },
                form: this.state.forms.ssink,
            });
        }
    },
};
