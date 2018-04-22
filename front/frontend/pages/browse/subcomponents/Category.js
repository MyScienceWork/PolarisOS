const _ = require('lodash');
const moment = require('moment');
const Vue = require('vue');

const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const QueryMixin = require('../../../../common/mixins/QueryMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const Messages = require('../../../../common/api/messages');
const APIRoutes = require('../../../../common/api/routes');
const AggregationSpecs = require('../../../../common/specs/aggs');

module.exports = {
    mixins: [LangMixin, FormMixin, QueryMixin, FormCleanerMixin],
    props: {
        filters: { type: Array, default: () => [] },
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        browse: 'browsing_creation',
                        selected: 'browsing_selected_creation',
                        aggregation: 'browsing_aggregation_creation',
                    },
                    reads: {
                        search: 'search_read',
                    },
                },
            },
        };
    },
    mounted() {
        this.post_hook_query_changed(this.state.query);
    },
    methods: {
        browse() {
            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.creations.selected,
            });
        },
        browse_list(term) {
            this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                form: this.state.sinks.creations.selected,
                body: {
                    browsing_terms: [{ _id: term }],
                },
            });
            Vue.nextTick(() => {
                this.send_information(this.state.sinks.creations.selected);
            });
        },
        post_hook_query_changed(query) {
            const entity = query.entity;
            const label = query.label;
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.creations.browse,
                keep_content: false,
            });

            if (entity != null && entity.trim() !== '') {
                this.$store.dispatch('search', {
                    form: this.state.sinks.creations.browse,
                    path: APIRoutes.entity(entity, 'POST', true),
                    body: {
                        projection: [label],
                    },
                });
            }

            if (this.query.agge && this.query.aggf && this.query.aggt) {
                let aggregation = {};
                switch (this.query.aggt) {
                case 'terms':
                    aggregation = AggregationSpecs.terms_aggregation(this.query.aggf, 'myaggregation');
                    break;
                case 'date':
                    aggregation = AggregationSpecs.years_aggregation(this.query.aggf, 'myaggregation');
                    break;
                default:
                    break;
                }
                this.$store.dispatch('search', {
                    form: this.state.sinks.creations.aggregation,
                    path: APIRoutes.entity(this.query.agge, 'POST', true),
                    body: {
                        size: 0,
                        aggregations: aggregation,
                    },
                });
            }
        },

        send_information(sink) {
            if (sink === this.state.sinks.creations.selected) {
                const content = this.fcontent(this.state.sinks.creations.selected);
                if ('browsing_terms' in content) {
                    const ids = content.browsing_terms.map(b => b._id);
                    this.$emit('update:filters', [JSON.stringify({ [this.state.query.b]: ids })]);
                }
            }
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this, this.state.sinks.creations.selected);
        },
    },
    computed: {
        options() {
            if (this.picker !== 'date') {
                const content = this.fcontent(this.state.sinks.creations.browse);
                if (!(content instanceof Array)) {
                    return [];
                }
                return content.map((c) => {
                    c[this.label] = this.lang(c[this.label]);
                    return c;
                });
            }
            return [];
        },
        label() {
            return this.state.query.label || '_id';
        },
        abc() {
            return this.state.query.abc;
        },
        picker() {
            const picker = this.state.query.picker;
            return picker;
        },
        view() {
            const view = this.state.query.view;
            return view;
        },
        current_state() {
            return this.fstate(this.state.sinks.creations.selected);
        },
    },

};
