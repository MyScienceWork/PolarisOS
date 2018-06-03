const _ = require('lodash');
const moment = require('moment');
const LangMixin = require('../../../mixins/LangMixin');
const FormCleanerMixin = require('../../../mixins/FormCleanerMixin');
const FormMixin = require('../../../mixins/FormMixin');
const Handlebars = require('../../../../../app/modules/utils/templating');

const Bar = require('./charts/Bar.vue');
const Histogram = require('./charts/Histogram.vue');
const Pie = require('./charts/Pie.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    props: {
        charts: { type: Array, required: true },
    },
    components: {
        Pie,
        Histogram,
        Bar,
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
            const id = val.value;
            const info = this.charts.find(c => c._id === id);
            this.state.choosen_info = info;
        },
        load_chart() {
            if (!this.state.choosen_info) {
                return;
            }

            const info = this.state.choosen_info;
            const query = JSON.parse(Handlebars.compile(info.query)(this.state.dates));
            const aggregation = JSON.parse(info.aggregation);

            this.$store.dispatch('search', {
                form: this.sinks.creations.chart,
                path: info.path,
                body: {
                    size: 0,
                    where: query,
                    aggregations: aggregation,
                },
            });
            console.log(id);
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

            console.log(content);
            return null;
        },
    },
    mounted() {
        this.state.charts = this.charts.map(c => ({ label: this.lang(c.label), value: c._id }));
    },
};
