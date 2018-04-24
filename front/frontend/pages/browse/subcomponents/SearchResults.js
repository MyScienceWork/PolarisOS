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
                export_subtype: null,
                sinks: {
                    reads: {
                        export: 'exporter_read',
                    },
                },
            },
        };
    },
    methods: {
        export_format(format, subtype) {
            this.state.export_type = format;
            this.state.export_subtype = subtype;

            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.reads.export,
            });
        },
        send_information(sink) {
            if (sink === this.state.sinks.reads.export) {
                this.run_export(sink);
            } else if (sink === this.searchSink) {
                /* this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.sinks.reads.export,
                    keep_content: false,
                });*/
                this.add_extra_filters(sink, 'pos_aggregate', '*');
                this.run_search(sink);
            }
        },
        run_export(sink) {
            const content = this.fcontent(sink);
            this.$store.dispatch('download', {
                path: APIRoutes.export(),
                body: {
                    ids: this.$lodash.reduce(content, (arr, val, key) => {
                        if (val) {
                            arr.push(key);
                        }
                        return arr;
                    }, []),
                    type: this.state.export_type || null,
                    subtype: this.state.export_subtype || null,
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
