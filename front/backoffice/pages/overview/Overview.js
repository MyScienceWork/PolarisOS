const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin, FormCleanerMixin],
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
            this.state.charts[`${len}`] = true;
            this.$forceUpdate();
        },
        remove_chart(id) {
            if (id in this.state.charts) {
                delete this.state.charts[id];
                this.$forceUpdate();
            }
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
    },
};
