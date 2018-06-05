const _ = require('lodash');
window.moment = require('moment-timezone');
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

module.exports = {
    props: {
        id: { required: true, type: String },
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        pointFormat: { type: String, default: '{serie.name}' },
        headerFormat: { type: String, default: '{point.key}<br />' },
        footerFormat: { type: String, default: '' },
        tooltipUseHtml: { type: Boolean, default: false },
        tooltipShared: { type: Boolean, default: false },
        serieName: { required: false, type: String, default: '' },
        serieData: { required: false, type: Array, default: () => [] },
        timezone: { required: false, type: String, default: 'Europe/Paris' },
    },
    data() {
        return {
            state: {
                chartObj: null,
            },
        };
    },
    methods: {
    },
    computed: {
        initialDescription() {
            return {
                title: {
                    text: this.title || '',
                },
                subtitle: {
                    text: this.subtitle || '',
                },
                tooltip: {
                    headerFormat: this.headerFormat,
                    pointFormat: this.pointFormat,
                    footerFormat: this.footerFormat,
                    shared: this.tooltipShared,
                    useHTML: this.tooltipUseHtml,
                },
            };
        },
        sourceDescription() {
            // TO BE REIMPLEMENTED IN SUBCLASS
            return {

            };
        },
        finalDescription() {
            return _.merge(this.sourceDescription, this.initialDescription);
        },
    },
    watch: {
        serieData(nd) {
            /* if (this.state.chartObj) {
                this.state.chartObj.series[0].setData(nd, true);
            } else {*/
            this.state.chartObj = Highcharts.chart(this.id, this.finalDescription);
            // }
        },
    },
    mounted() {
        Highcharts.setOptions({
            time: {
                timezone: this.timezone,
            },
        });
        this.state.chartObj = Highcharts.chart(this.id, this.finalDescription);
    },
};
