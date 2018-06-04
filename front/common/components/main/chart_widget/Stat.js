const APIRoutes = require('../../../api/routes');
const Utils = require('../../../utils/utils');
const ReaderMixin = require('../../../mixins/ReaderMixin');
const SuborganizationMixin = require('../../../mixins/SuborganizationMixin');
const LangMixin = require('../../../mixins/LangMixin');
const FormCleanerMixin = require('../../../mixins/FormCleanerMixin');
const AccessMixin = require('../../../mixins/AccessMixin');
const Messages = require('../../../api/messages');

const Histogram = require('./charts/Histogram.vue');
const Pie = require('./charts/Pie.vue');

const _ = require('lodash');
const moment = require('moment');
const momenttz = require('moment-timezone');

module.exports = {
    mixins: [LangMixin, ReaderMixin, SuborganizationMixin, FormCleanerMixin, AccessMixin],
    data() {
        return {
            state: {
                paths: {
                    creations: {
                        device: APIRoutes.entity('device', 'POST'),
                    },
                    reads: {
                        device: undefined,
                        template: undefined,
                    },
                },
                sinks: {
                    creations: {
                        device: 'device_creation',
                        chart: 'chart_creation',
                    },
                    reads: {
                        device: 'device_read',
                        template: 'template_read',
                        suborganization: 'suborganization_read',
                        chart: 'chart_read',
                    },
                },
                datetime: '',
                chart_pie_desk: [],
                chart_pie_machine: [],
                chart_pie_prequalification: [],
                chart_pie_rtype: [],
                chart_registrations: [],
                chart_callings: [],
                mam_waiting: undefined,
                mam_processing: undefined,
                chart_mam_processing_desk: [],
                chart_mam_processing_prequalification: [],
                chart_mam_waiting_prequalification: [],
                resolution: '%d-%m-%Y',
            },
        };
    },
    components: {
        Pie,
        Histogram,
    },
    methods: {
        load_stats() {
            const form = this.state.sinks.creations.chart;
            const content = this.fcontent(form);
            const start = +moment(content.start || 0);
            const end = +moment(content.end || 0);
            this.$store.state.requests.push({
                name: 'read',
                content: {
                    form: this.state.sinks.reads.chart,
                    path: APIRoutes.stat(this.state.suborganization, start, end, 'all'),
                },
            });
        },
        updatePage() {
            if (this.state.suborganization == null) {
                this.state.paths.reads.device = undefined;
                this.state.paths.reads.template = undefined;
            } else {
                const form = this.fform(this.state.sinks.creations.chart);
                form.content = {
                    start: +momenttz().tz(this.state.tz).subtract(1, 'months'),
                    end: +momenttz().tz(this.state.tz),
                };
                this.load_stats();
            }
        },
        show_success_read(form) {
            if (form === this.state.sinks.reads.chart) {
                const content = this.fcontent(form);
                this.state.chart_pie_desk = content.per_desk;
                this.state.chart_pie_machine = content.per_machine;
                this.state.chart_pie_rtype = content.per_registration_type;

                this.state.chart_pie_prequalification =
                    content.per_prequalification.map(m => ({ name: m.name[this.lang], y: m.y }));

                this.state.chart_registrations = content.registrations;
                this.state.chart_callings = content.callings;

                this.state.mam_waiting = content.min_avg_max_waiting;
                this.state.chart_mam_waiting_prequalification =
                    content.min_avg_max_waiting_per_prequalification.map(m => ({ name: m.name[this.lang], values: m.values }));

                this.state.mam_processing = content.min_avg_max_processing;
                this.state.chart_mam_processing_prequalification =
                    content.min_avg_max_processing_per_prequalification.map(m => ({ name: m.name[this.lang], values: m.values }));

                this.state.chart_mam_processing_desk = content.min_avg_max_processing_per_desk;
                switch (content.time_resolution) {
                case '1d':
                default:
                    this.state.resolution = '%d-%m-%Y';
                    break;
                case '1h':
                case '1m':
                    this.state.resolution = '%d-%m-%Y (%H:%M)';
                    break;
                }
            }
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.creations.chart,
            keep_content: false,
        });
    },
    watch: {
        error_device(n) {
            return this.mwerror(this.state.sinks.reads.device)(n);
        },
        current_read_state_device(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.device)(s);
        },
        current_creation_state_chart(s) {
            return this.mwcurrent_read_state(this.state.sinks.creations.chart)(s);
        },
        current_read_state_chart(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.chart)(s);
        },
    },
    computed: {
        content_device() {
            return this.mcontent(this.state.sinks.reads.device);
        },
        length_device() {
            return this.mlength(this.state.sinks.reads.device);
        },
        read_content_device() {
            const content = this.content_device;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_device() {
            return this.merror(this.state.sinks.reads.device);
        },
        current_read_state_device() {
            return this.mcurrent_read_state(this.state.sinks.reads.device);
        },
        current_creation_state_chart() {
            return this.mcurrent_read_state(this.state.sinks.creations.chart);
        },
        current_read_state_chart() {
            return this.mcurrent_read_state(this.state.sinks.reads.chart);
        },
    },
};
