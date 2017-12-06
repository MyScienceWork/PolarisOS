const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');

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
                selected_types: {},
            },
        };
    },
    methods: {
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
                projection: ['name', 'type'],
                size: 10000,
            },
        });
    },
    computed: {
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
                        obj[func.type] = [];
                    }
                    obj[func.type].push(func);
                    return obj;
                }, {});
            }
            return {};
        },
    },
};
