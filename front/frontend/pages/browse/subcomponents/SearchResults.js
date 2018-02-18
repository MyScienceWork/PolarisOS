const Messages = require('../../../../common/api/messages');
const APIRoutes = require('../../../../common/api/routes');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const PaginationSearchMixin = require('../../../../common/mixins/PaginationSearchMixin');
const Auth = require('../../../../common/utils/auth');
const Handlerbars = require('../../../../../app/modules/utils/templating');

module.exports = {
    mixins: [LangMixin, FormMixin, PaginationSearchMixin],
    props: {
    },
    data() {
        return {
            state: {
                loggedIn: false,
                export_type: '',
                sinks: {
                    reads: {
                        export: 'exporter_read',
                    },
                },
            },
        };
    },
    methods: {
        export_format(format, e) {
            e.preventDefault();
            this.state.export_type = format;
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads.export,
                keepContent: false,
            });

            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.reads.export,
            });
        },
        send_information(sink) {
            console.log('send information', sink);
            if (sink === this.state.sinks.reads.export) {
                this.run_export(sink);
            } else if (sink === this.searchSink) {
                this.run_search(sink);
            }
        },
        run_export(sink) {
            const content = this.fcontent(sink);
            this.$store.dispatch('create', {
                path: APIRoutes.export(),
                body: {
                    ids: Object.keys(content),
                    type: content.type || '',
                },
            });
        },
    },
    watch: {
        current_state_export(s) {
            this.dispatch(s, this, this.state.sinks.reads.export);
        },
    },
    computed: {
        content() {
            const content = this.fcontent(this.resultSink);
            if (!(content instanceof Array)) {
                return [];
            }

            return content.map((c) => {
                c.html = Handlerbars.compile(c.denormalization.template)(c);
                return c;
            });
        },
        total() {
            const form = this.fform(this.resultSink);
            return form.total || 0;
        },
        current_state_export() {
            return this.fstate(this.state.sinks.reads.export);
        },
    },
    beforeMount() {
        Auth.loggedIn('publication', ['c', 'u']).then((ok) => {
            this.state.loggedIn = ok;
        }).catch(err => console.error(err));
    },
};
