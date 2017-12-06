const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('function', 'POST'),
                rpath: APIRoutes.entity('function', 'GET'),
                cform: 'function_creation',
                rform: 'function_read',
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
    },
};
