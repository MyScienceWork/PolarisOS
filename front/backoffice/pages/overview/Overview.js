const Utils = require('../../../common/utils/utils');
const BrowserUtils = require('../../../common/utils/browser');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const NotificationMixin = require('../../../common/mixins/NotificationMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin, FormCleanerMixin, NotificationMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        chart: 'chart_configuration_read',
                    },
                },
                paths: {
                    reads: {
                        chart: APIRoutes.entity('chart', 'POST', true),
                    },
                },
                charts: {},
            },
        };
    },
    methods: {
        add_chart() {
            const len = Object.keys(this.state.charts).length + 1;
            this.state.charts[`${len}`] = {};
            this.$forceUpdate();
        },
        remove_chart(id) {
            if (id in this.state.charts) {
                delete this.state.charts[id];
                this.$forceUpdate();
            }
        },
        save_dashboard() {
            BrowserUtils.localSet('overview_dashboard', this.state.charts);
            this.notify('l_save_dashboard_configuration_success', 'success');
        },
        update_chart_info(i, info) {
            this.state.charts[i] = Object.assign({}, info);
        },
    },
    computed: {
        charts() {
            return this.mcontent(this.state.sinks.reads.chart);
        },
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.chart,
            path: this.state.paths.reads.chart,
            body: {
                size: 10000,
            },
        });

        const saved_configuration = BrowserUtils.localGet('overview_dashboard');
        if (saved_configuration) {
            this.state.charts = Object.assign({}, saved_configuration);
        }
    },
};
