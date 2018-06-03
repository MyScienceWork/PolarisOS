const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const ChartTypes = require('../../../common/lists/charttypes');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormCleanerMixin, ESQueryMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        chart: APIRoutes.entity('chart', 'POST', true),
                    },
                    creations: {
                        chart: APIRoutes.entity('chart', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        chart: 'chart_configuration_read',
                    },
                    creations: {
                        chart: 'chart_configuration_creation',
                        search: 'chart_configuration_creation_search',
                    },
                },
                es_query_id: 'backoffice-chart-configuration-query',
            },
        };
    },
    methods: {
    },
    mounted() {
    },
    computed: {
        chart_types() {
            return ChartTypes.map((c) => {
                c.label = this.lang(c.label);
                return c;
            });
        },
    },
};
