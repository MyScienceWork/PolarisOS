const _ = require('lodash');
const moment = require('moment');
const APIRoutes = require('../../../api/routes');
const Messages = require('../../../api/messages');
const LangMixin = require('../../../mixins/LangMixin');
const FormCleanerMixin = require('../../../mixins/FormCleanerMixin');
const FormMixin = require('../../../mixins/FormMixin');
const FiltersMixin = require('../../../mixins/FiltersMixin');
const Handlebars = require('../../../../../app/modules/utils/templating');

const VSelect = require('vue-select').VueSelect;
const Bar = require('./charts/Bar.vue');
const Histogram = require('./charts/Histogram.vue');
const Pie = require('./charts/Pie.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin, FiltersMixin],
    props: {
        charts: { type: Array, required: true },
        defaultState: { type: Object, default: () => ({}) },
    },
    components: {
        Pie,
        Histogram,
        Bar,
        VSelect,
    },
    data() {
        return {
            state: {
                choosen_chart: null,
                choosen_info: null,
                charts: [],
                dates: {
                    end: null,
                    start: null,
                    activated: true,
                },
                sinks: {
                    creations: {
                        chart: `chart_widget_creation_${+moment()}`,
                    },
                },
            },
        };
    },
    methods: {
        update_chart(val) {
            if (!val) {
                this.state.choosen_info = null;
                this.state.choosen_chart = null;
                return;
            }
            const id = val.value;
            const info = this.charts.find(c => c._id === id);
            this.state.choosen_info = info;
            this.state.choosen_chart = val;
        },
        load_chart() {
            if (!this.state.choosen_info) {
                return;
            }

            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.creations.chart,
            });

            const info = this.state.choosen_info;
            const query = JSON.parse(Handlebars.compile(info.query)(this.state.dates));
            const aggregation = JSON.parse(info.aggregations[0].aggregation);

            this.$store.dispatch('search', {
                form: this.state.sinks.creations.chart,
                path: APIRoutes.entity(info.entity, 'POST', true),
                body: {
                    size: 0,
                    where: query,
                    aggregations: aggregation,
                },
            });

            this.$emit('update:defaultState', {
                choosen_chart: this.state.choosen_chart,
                dates: this.state.dates,
            });
        },
    },
    watch: {
        charts(new_charts) {
            this.state.charts = new_charts.map(c => ({ label: this.lang(c.name), value: c._id }));
            this.update_chart(this.state.choosen_chart);
            this.load_chart();
        },
    },
    computed: {
        info() {
            return this.state.choosen_info;
        },
        data() {
            const content = this.fcontent(this.state.sinks.creations.chart);
            if (!content) {
                return null;
            }

            let ct = content;
            let keys = Object.keys(ct);
            while (keys.length === 1 && keys[0] !== 'buckets') {
                ct = ct[keys[0]];
                keys = Object.keys(ct);
            }

            if (!('buckets' in ct)) {
                return null;
            }


            if (this.info.chart === 'bar') {
                const categories = ct.buckets.map(b => (this.lang(b.key_as_string || b.key)));
                const data = ct.buckets.map(b => b.doc_count);
                const xaxis = { crosshair: true, categories };
                return {
                    xaxis,
                    series: [
                        {
                            name: this.info.aggregations[0].name,
                            data,
                            color: this.info.aggregations[0].color,
                        },
                    ],
                };
            } else if (this.info.chart === 'pie') {
                const data = ct.buckets.map(b => ({
                    name: this.lang(b.key_as_string || b.key),
                    y: b.doc_count,
                }));
                return {
                    series: data,
                };
            }
            return { series: [] };
        },
    },
    mounted() {
        this.state.charts = this.charts.map(c => ({ label: this.lang(c.name), value: c._id }));

        if (Object.keys(this.defaultState).length === 0) {
            return;
        }

        if (this.defaultState.dates.start) {
            this.defaultState.dates.start = new Date(this.defaultState.dates.start);
        }
        if (this.defaultState.dates.end) {
            this.defaultState.dates.end = new Date(this.defaultState.dates.end);
        }

        this.state = _.merge({}, this.state, this.defaultState);
        this.update_chart(this.state.choosen_chart);
        this.load_chart();
    },
};
