const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const RemoveMixin = require('../../../common/mixins/RemoveMixin');
const ChartTypes = require('../../../common/lists/charttypes');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormCleanerMixin, ESQueryMixin, RemoveMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        chart: APIRoutes.entity('chart', 'POST', true),
                        entity: APIRoutes.entity('entity', 'POST', true),
                    },
                    creations: {
                        chart: APIRoutes.entity('chart', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        chart: 'chart_configuration_read',
                        entity: 'entity_read',
                    },
                    creations: {
                        chart: 'chart_configuration_creation',
                        search: 'chart_configuration_creation_search',
                    },
                },
                es_query_id: 'backoffice-chart-configuration-query',
                my_entity: 'chart',
            },
        };
    },
    methods: {
    },
    mounted() {
        [['entity', ['type']]]
            .forEach((e) => {
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads[e[0]],
                    path: this.state.paths.reads[e[0]],
                    body: {
                        projection: e[1],
                        size: 10000,
                    },
                });
            });
    },
    computed: {
        chart_types() {
            return ChartTypes.map((c) => {
                c.label = this.lang(c.label);
                return c;
            });
        },
        entities() {
            const content = this.fcontent(this.state.sinks.reads.entity);
            if (content instanceof Array) {
                // TODO make this WAY cleaner;
                content.push({ type: 'entity' });
                content.push({ type: 'form' });
                content.push({ type: 'pipeline' });
                content.push({ type: 'user' });
                content.push({ type: 'role' });
                content.push({ type: 'identifier' });
                content.push({ type: 'publication' });
                return content;
            }
            return [];
        },
    },
};
