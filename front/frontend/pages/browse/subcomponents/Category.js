const _ = require('lodash');
const moment = require('moment');
const Vue = require('vue');

const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const QueryMixin = require('../../../../common/mixins/QueryMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const ReaderMixin = require('../../../../common/mixins/ReaderMixin');
const Messages = require('../../../../common/api/messages');
const APIRoutes = require('../../../../common/api/routes');
const AggregationSpecs = require('../../../../common/specs/aggs');
const Queries = require('../../../../common/specs/queries');

module.exports = {
    mixins: [LangMixin, FormMixin, QueryMixin, FormCleanerMixin, ReaderMixin],
    props: {
        filters: { type: Array, default: () => [] },
        activeResults: { type: Boolean, default: false },
        names: { type: Array, default: [] },
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        browse: 'browsing_creation',
                        browse_abc: 'browsing_abc_creation',
                        selected: 'browsing_selected_creation',
                        aggregation: 'browsing_aggregation_creation',
                    },
                    reads: {
                        search: 'search_read',
                    },
                },
                active_abc: null,
                active_result: false,
                current_page: 1,
                per_page: 30,
                URName: [],
            },
        };
    },
    mounted() {
        this.post_hook_query_changed(this.state.query, {});
        if (this.$route.query && this.$route.query.agge === 'author') {
            this.click_on_abc('A');
        }
    },
    methods: {
        browse() {
            this.send_information(this.state.sinks.creations.selected);
        },
        browse_list(term, name, type = 'publication') {
            this.state.URName = [name.split('(')[0]];
            this.$emit('update:names', this.state.URName);
            if (type === 'publication') {
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: this.state.sinks.creations.selected,
                    body: {
                        browsing_terms: [{ _id: term }],
                        browsing_dates: undefined,
                    },
                });
            } else if (type === 'date') {
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: this.state.sinks.creations.selected,
                    body: {
                        browsing_dates: term,
                        browsing_terms: undefined,
                    },
                });
            }
            this.state.active_abc = null;
            this.$emit('update:activeResults', true);
            Vue.nextTick(() => {
                this.send_information(this.state.sinks.creations.selected);
            });
        },
        post_hook_query_changed(query, old_query) {
            console.log(query, old_query);
            const { agge, aggf, aggt, entity, label } = query;
            let restrictions = query.restrictions || undefined;

            if (old_query.agge === agge && old_query.aggf === aggf
                    && old_query.aggt === aggt && old_query.entity === entity) {
                console.log('should return');
                return;
            }

            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.creations.browse,
                keep_content: false,
            });

            if (agge && aggf && aggt) {
                let aggregation = {};
                switch (query.aggt) {
                case 'terms':
                    aggregation = AggregationSpecs.terms_aggregation(aggf, 'myaggregation', 1);
                    break;
                case 'date':
                    aggregation = AggregationSpecs.years_aggregation(aggf, 'myaggregation', 1);
                    break;
                default:
                    break;
                }

                let where = {};
                if (agge === 'publication') {
                    where = { $and: [Queries.published, Queries.no_other_version] };
                }

                if (restrictions) {
                    if (!('$and' in where)) {
                        where.$and = [];
                    }

                    if (!(restrictions instanceof Array)) {
                        restrictions = [restrictions];
                    }
                    restrictions.forEach(r => where.$and.push(JSON.parse(window.atob(r))));
                }

                this.$store.dispatch('search', {
                    form: this.state.sinks.creations.aggregation,
                    path: APIRoutes.entity(agge, 'POST', true),
                    body: {
                        size: 0,
                        where,
                        aggregations: aggregation,
                    },
                }).then((results) => {
                    const content = results.data;
                    const agg_info = this.retrieve_aggregation_content(content);
                    const keys = agg_info.map(ai => ai.key);

                    if (entity != null && entity.trim() !== '') {
                        let _where = { _id: keys };
                        if (entity === 'laboratory') {
                            _where = {
                                $and: [{ _id: keys }, { 'system.show_in_browse': true }],
                            };
                        }

                        const body = {
                            projection: [label],
                            where: _where,
                            size: 1000,
                        };
                        if (query.order) {
                            body.sort = query.order.split('|');
                        }

                        this.$store.dispatch('search', {
                            form: this.state.sinks.creations.browse,
                            path: APIRoutes.entity(entity, 'POST', true),
                            body,
                        });
                    }
                });
            } else {
                this.$store.commit(Messages.REMOVE_FORM, {
                    form: this.state.sinks.creations.aggregation,
                });
            }
        },

        send_information(sink) {
            if (sink === this.state.sinks.creations.selected) {
                const content = this.fcontent(this.state.sinks.creations.selected);
                if ('browsing_terms' in content && content.browsing_terms) {
                    const ids = _.map(content.browsing_terms, b => b._id);
                    this.$emit('update:filters', [JSON.stringify({ [this.state.query.b]: ids })]);
                } else if ('browsing_dates' in content && content.browsing_dates) {
                    const date = content.browsing_dates;
                    this.$emit('update:filters', [JSON.stringify({ [this.state.query.b]: {
                        '>=': date,
                        '<': `${parseInt(date, 10) + 1}`,
                        f: 'YYYY',
                    } })]);
                }
            }
        },

        click_on_abc(letter) {
            this.$emit('update:activeResults', false);
            this.state.active_abc = letter;
            const entity = this.query.agge;
            const label = this.query.label;
            const order = this.query.order;
            const field = this.query.aggf;
            let restrictions = this.query.restrictions;
            if (entity != null && entity.trim() !== '' && label != null) {
                const where = {
                    $and: [{ [field]: letter }],
                };

                if (restrictions) {
                    if (!(restrictions instanceof Array)) {
                        restrictions = [restrictions];
                    }

                    restrictions.forEach(r => where.$and.push(JSON.parse(window.atob(r))));
                }

                const body = {
                    projection: [label],
                    size: 10000,
                    where,
                };
                if (order) {
                    body.sort = order.split('|');
                }

                this.$store.dispatch('search', {
                    form: this.state.sinks.creations.browse_abc,
                    path: APIRoutes.entity(entity, 'POST', true),
                    body,
                });
            }
        },
        retrieve_aggregation_content(content) {
            if (!content) {
                return [];
            }

            let ct = content;
            let keys = Object.keys(ct);
            while (keys.length === 1 && keys[0] !== 'myaggregation') {
                ct = ct[keys[0]];
                keys = Object.keys(ct);
            }

            if (!('myaggregation' in ct)) {
                return [];
            }

            return ct.myaggregation.buckets.map((b) => {
                const key = b.key_as_string || b.key;
                const count = b.doc_count;
                return { key, count };
            });
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this, this.state.sinks.creations.selected);
        },
        query_entity() {
            if (this.$route.query.entity === 'author') {
                this.click_on_abc('A');
            }
        },
        activeResults() {
            if (!this.activeResults) {
                this.state.URName = undefined;
            }
        },
        query_seso_filter() {
            if (['laboratory', 'project', 'survey', 'author'].indexOf(this.$route.query.entity) === -1) {
                return;
            }
            this.state.URName = [];
            const s_filter = this.state.query.seso_filter[0];
            const ids = s_filter.split('[')[1].split('"').filter(elt => elt !== '' && elt !== ',' && elt !== ']}');
            if (['laboratory', 'project', 'survey'].indexOf(this.$route.query.entity) !== -1) {
                ids.forEach((elt) => {
                    const info = this.options.find(x => x._id === elt);
                    if (info) {
                        this.state.URName.push(info.html.split('(')[0]);
                    }
                });
            } else if (this.$route.query.entity === 'author') {
                ids.forEach((elt) => {
                    const info = this.options_abc.find(x => x._id === elt);
                    if (info) {
                        this.state.URName.push(info.fullname);
                    }
                });
            }
            this.$emit('update:names', this.state.URName);
        },
    },
    computed: {
        query_entity() {
            return this.$route.query.entity;
        },
        query_seso_filter() {
            return this.$route.query.seso_filter;
        },
        paginated() {
            return (content) => {
                const end = this.state.current_page * this.state.per_page;
                const start = end - this.state.per_page;
                const sliced = content.slice(start, end);
                return sliced;
            };
        },
        options() {
            if (this.picker !== 'date') {
                const content = this.fcontent(this.state.sinks.creations.browse);
                if (!(content instanceof Array)) {
                    return [];
                }


                return content.filter(c => ['#POS#LANGl_ined_no_project', '#POS#LANGl_POS_NOP_2018_survey'].indexOf(c[this.label]) === -1)
                    .map((c) => {
                    // console.log(`label::${this.label}`);
                    // console.log(c[this.label]);
                        if (this.aggregations.length > 0 && this.query.agge === 'publication') {
                            const info = this.aggregations.find(a => a.key === c._id);
                            const count = info ? info.count : 0;
                            if (count === 0) {
                                return null;
                            }
                            if (this.use_hlang) {
                                c.label_count = `${this.hlang(c[this.label])} (${count})`;
                                c.html = `${this.hlang(c[this.label])} (<strong>${count}</strong>)`;
                            } else {
                                c.label_count = `${this.lang(c[this.label])} (${count})`;
                                c.html = `${this.lang(c[this.label])} (<strong>${count}</strong>)`;
                            }
                        } else if (this.use_hlang) {
                            c.label_count = this.hlang(c[this.label]);
                            c.html = this.hlang(c[this.label]);
                        } else {
                            c.label_count = this.lang(c[this.label]);
                            c.html = this.lang(c[this.label]);
                        }
                        return c;
                    }).filter(f => f != null);
            }
            return [];
        },
        aggregations() {
            const content = this.fcontent(this.state.sinks.creations.aggregation);
            return this.retrieve_aggregation_content(content);
        },
        options_abc() {
            const content = this.fcontent(this.state.sinks.creations.browse_abc);
            if (!(content instanceof Array)) {
                return [];
            }
            return content.map((c) => {
                if (this.use_hlang) {
                    c[this.label] = this.hlang(c[this.label]);
                } else {
                    c[this.label] = this.lang(c[this.label]);
                }
                return c;
            });
        },
        label() {
            return this.state.query.label || '_id';
        },
        use_hlang() {
            return this.state.query.use_hlang || false;
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
        total() {
            if (this.state.query.aggt !== 'date') {
                const content = this.fcontent(this.state.sinks.creations.browse);
                if (!(content instanceof Array)) {
                    return 0;
                }
                return content.length;
            }
            return this.aggregations.length;
        },
        total_abc() {
            const content = this.fcontent(this.state.sinks.creations.browse_abc);
            if (!(content instanceof Array)) {
                return 0;
            }
            return content.length;
        },
    },

};
