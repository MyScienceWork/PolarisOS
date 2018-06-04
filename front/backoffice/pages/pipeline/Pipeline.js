const ValTypes = require('../../../common/lists/valtypes');
const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormCleanerMixin, ESQueryMixin],
    data() {
        return {
            state: {
                paths: {
                    creations: {
                        pipeline: APIRoutes.entity('pipeline', 'POST'),
                    },
                    reads: {
                        pipeline: APIRoutes.entity('pipeline', 'POST', true),
                        function: APIRoutes.entity('function', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        pipeline: 'pipeline_read',
                        function: 'function_read',
                    },
                    creations: {
                        pipeline: 'pipeline_creation',
                        search: 'search_creation_pipeline',
                    },
                },
                selected_functions: {
                    completer: {},
                    formatter: {},
                },
                es_query_id: 'backoffice-pipeline-query',
            },
        };
    },
    methods: {
        function_change(val, part, idx) {
            if (val == null) {
                if (part in this.state.selected_functions
                        && idx in this.state.selected_functions[part]) {
                    delete this.state.selected_types[part][idx];
                }
            } else {
                this.state.selected_functions[part] = Object.assign({},
                    this.state.selected_functions[part],
                    { [idx]: this.functions[part][val.value] });
            }
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.function,
            keepContent: false,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.function,
            path: this.state.paths.reads.function,
            body: {
                size: 10000,
            },
        });
    },
    watch: {
        error_function(n) {
            return this.mwerror(this.state.sinks.reads.function)(n);
        },
        current_read_state_function(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.function)(s);
        },
    },
    computed: {
        valtypes() {
            return ValTypes || [];
        },

        length_function() {
            return this.mlength(this.state.sinks.reads.function);
        },
        error_function() {
            return this.merror(this.state.sinks.reads.function);
        },
        current_read_state_function() {
            return this.mcurrent_read_state(this.state.sinks.reads.function);
        },
        functions() {
            const content = this.mcontent(this.state.sinks.reads.function);
            return content.reduce((obj, func) => {
                if (!(func.type in obj)) {
                    obj[func.type] = {};
                }
                obj[func.type][func.name] = func;
                return obj;
            }, {});
            return {};
        },
    },
};
