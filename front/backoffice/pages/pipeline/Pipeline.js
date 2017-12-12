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
                cform: 'pipeline_creation',
                rform: 'pipeline_read',
                itemsPerPage: 20,
                itemsPerRow: 2,
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
            form: this.state.rform,
            path: this.state.rpath,
        });
        this.$store.dispatch('search', {
            form: 'function_read',
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
        content() {
            if (this.state.rform in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform];
                const content = form.content || [];
                return content;
            }
            return [];
        },
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        functions() {
            if ('function_read' in this.$store.state.forms) {
                const form = this.$store.state.forms.function_read;
                const content = form.content || [];
                return content.reduce((obj, func) => {
                    if (!(func.type in obj)) {
                        obj[func.type] = {};
                    }
                    obj[func.type][func.name] = func;
                    return obj;
                }, {});
            }
            return {};
        },
    },
};
