const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const ValTypes = require('../../../common/lists/valtypes');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('pipeline', 'POST'),
                rpath: APIRoutes.entity('pipeline', 'GET'),
                itemsPerPage: 20,
                itemsPerRow: 2,
                forms: {
                    csink: 'pipeline_creation',
                    rsink: 'pipeline_read',
                    rsink_function: 'function_read',
                },
                selected_functions: {
                    completer: {},
                    formatter: {},
                },
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
        this.$store.dispatch('single_read', {
            form: this.state.forms.rsink,
            path: this.state.rpath,
        });
        this.$store.dispatch('search', {
            form: this.state.forms.rsink_function,
            path: APIRoutes.entity('function', 'POST', true),
            body: {
                size: 10000,
            },
        });
    },
    computed: {
        valtypes() {
            return ValTypes || [];
        },
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        functions() {
            const content = this.mcontent(this.state.forms.rsink_function);
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
