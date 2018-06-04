const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');


const Highcharts = require('highcharts');
// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);

// Maps
const EuropeMap = require('../../../common/maps/europe');

Highcharts.maps['custom/europe'] = EuropeMap;

module.exports = {
    data() {
        return {
            state: {
                chart_1: {
                    chart: {
                        type: 'column',
                    },
                    title: {
                        text: '',
                    },
                    subtitle: {
                        text: '',
                    },
                    xAxis: {
                        categories: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        crosshair: true,
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Deposits',
                        },
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true,
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                        },
                    },
                    series: [{
                        name: 'Deposits',
                        data: [52, 33, 37, 12, 35, 23, 10, 9, 120, 160, 190, 212],
                    }],
                },
                chart_2: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                    },
                    title: {
                        text: '',
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
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
                    series: [{
                        name: 'File access',
                        colorByPoint: true,
                        data: [{
                            name: 'Open Access',
                            selected: true,
                            y: 41.10,
                        }, {
                            name: 'Restricted Access',
                            y: 10.90,
                        }, {
                            name: 'Embargoed Access',
                            y: 27.00,
                        }, {
                            name: 'Closed Access',
                            y: 21.00,
                        }],
                    }],
                },
                chart_3: {
                    chart: {
                        map: 'custom/europe',
                        spacingBottom: 20,
                    },

                    title: {
                        text: '',
                    },

                    legend: {
                        enabled: true,
                    },
                    colorAxis: {
                        type: 'linear',
                        min: 0,
                        minColor: '#EEEEFF',
                        maxColor: '#000022',
                    },
                    mapNavigation: {
                        enabled: true,
                    },
                    series: [{
                        name: 'Researchers',
                        joinBy: ['iso-a2', 'code'],
                        dataLabels: {
                            enabled: true,
                            color: '#FFFFFF',
                            format: '{point.code}',
                        },
                        tooltip: {
                            pointFormat: '{point.code}: {point.value} %',
                        },
                        data: [
                            {
                                code: 'IE',
                                value: 2,
                            },
                            {
                                code: 'IS',
                                value: 2,
                            },
                            {
                                code: 'GB',
                                value: 6,
                            },
                            {
                                code: 'PT',
                                value: 0,
                            },
                            {
                                code: 'NO',
                                value: 1,
                            },
                            {
                                code: 'SE',
                                value: 1,
                            },
                            {
                                code: 'DK',
                                value: 4,
                            },
                            {
                                code: 'DE',
                                value: 12,
                            },
                            {
                                code: 'NL',
                                value: 3,
                            },
                            {
                                code: 'BE',
                                value: 12,
                            },
                            {
                                code: 'LU',
                                value: 5,
                            },
                            {
                                code: 'ES',
                                value: 10,
                            },
                            {
                                code: 'FR',
                                value: 30,
                            },
                            {
                                code: 'PL',
                                value: 0,
                            },
                            {
                                code: 'CZ',
                                value: 0,
                            },
                            {
                                code: 'AT',
                                value: 0,
                            },
                            {
                                code: 'CH',
                                value: 5,
                            },
                            {
                                code: 'LI',
                                value: 0,
                            },
                            {
                                code: 'SK',
                                value: 0,
                            },
                            {
                                code: 'HU',
                                value: 0,
                            },
                            {
                                code: 'SI',
                                value: 0,
                            },
                            {
                                code: 'IT',
                                value: 0,
                            },
                            {
                                code: 'SM',
                                value: 0,
                            },
                            {
                                code: 'HR',
                                value: 0,
                            },
                            {
                                code: 'BA',
                                value: 0,
                            },
                            {
                                code: 'ME',
                                value: 1,
                            },
                            {
                                code: 'AL',
                                value: 0,
                            },
                            {
                                code: 'MK',
                                value: 0,
                            },
                            {
                                code: 'FI',
                                value: 0,
                            },
                            {
                                code: 'EE',
                                value: 0,
                            },
                            {
                                code: 'LV',
                                value: 0,
                            },
                            {
                                code: 'LT',
                                value: 0,
                            },
                            {
                                code: 'BY',
                                value: 0,
                            },
                            {
                                code: 'UA',
                                value: 0,
                            },
                            {
                                code: 'MD',
                                value: 0,
                            },
                            {
                                code: 'RO',
                                value: 2,
                            },
                            {
                                code: 'BG',
                                value: 0,
                            },
                            {
                                code: 'GR',
                                value: 3,
                            },
                            {
                                code: 'TR',
                                value: 0,
                            },
                            {
                                code: 'CY',
                                value: 0,
                            },
                            {
                                code: 'RU',
                                value: 1,
                            },
                        ],
                    }],
                },
                chart_4: {},
            },
        };
    },
    mounted() {
        Highcharts.chart('chart_2', this.state.chart_2);
        Highcharts.chart('chart_1', this.state.chart_1);
        Highcharts.mapChart('chart_3', this.state.chart_3);
    },
};
