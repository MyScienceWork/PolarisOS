const Highcharts = require('highcharts');
const ChartMixin = require('./mixins/ChartMixin');

module.exports = {
    mixins: [ChartMixin],
    computed: {
        sourceDescription() {
            return {
                series: [{
                    name: this.serieName,
                    colorByPoint: true,
                    data: this.serieData,
                }],
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                        },
                        showInLegend: true,
                    },
                },
            };
        },
    },
};
