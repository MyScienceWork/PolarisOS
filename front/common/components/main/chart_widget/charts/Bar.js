const Highcharts = require('highcharts');
const ChartMixin = require('./mixins/ChartMixin');

module.exports = {
    mixins: [ChartMixin],
    props: {
        xAxis: { type: Object, default: () => {} },
        yAxis: { type: Object, default: () => {} },
        series: { required: true, type: Array, default: () => [] },
    },
    computed: {
        sourceDescription() {
            return {
                legend: {
                    enabled: false,
                },
                plotOptions: {
                },
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: this.series,
                chart: {
                    type: 'column',
                },
            };
        },
    },
};
