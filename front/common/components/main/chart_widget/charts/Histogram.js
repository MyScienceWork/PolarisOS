const Highcharts = require('highcharts');
const ChartMixin = require('./mixins/ChartMixin');

module.exports = {
    mixins: [ChartMixin],
    props: {
        xAxis: { type: Object, default: () => {} },
        yAxis: { type: Object, default: () => {} },
    },
    computed: {
        sourceDescription() {
            return {
                legend: {
                    enabled: false,
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1,
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
                            ],
                        },
                        marker: {
                            radius: 2,
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1,
                            },
                        },
                        threshold: null,
                    },
                },
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                series: [{
                    type: 'area',
                    name: this.serieName,
                    data: this.serieData,
                }],
            };
        },
    },
};
