const Messages = require('../../../../common/api/messages');
const APIRoutes = require('../../../../common/api/routes');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const PaginationSearchMixin = require('../../../../common/mixins/PaginationSearchMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const Auth = require('../../../../common/utils/auth');
const Handlebars = require('../../../../../app/modules/utils/templating');

const Results = require('./Results.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, PaginationSearchMixin, FormCleanerMixin],
    props: {
    },
    components: {
        Results,
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
                keep_content: false,
            });

            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.reads.export,
            });
        },
        send_information(sink) {
            if (sink === this.state.sinks.reads.export) {
                this.run_export(sink);
            } else if (sink === this.searchSink) {
                this.add_extra_filters(sink, 'pos_aggregate', '*');
                this.run_search(sink);
            }
        },
        run_export(sink) {
            const content = this.fcontent(sink);
            this.$store.dispatch('download', {
                path: APIRoutes.export(),
                body: {
                    ids: Object.keys(content),
                    type: this.state.export_type || null,
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
                c.html = this.hlang(Handlebars.compile(c.denormalization.type.template)(c));
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
        user() {
            return Auth.user();
        },
    },
    beforeMount() {
        Auth.loggedIn('publication', ['c', 'u']).then((ok) => {
            this.state.loggedIn = ok;
        }).catch(err => console.error(err));
    },
};
