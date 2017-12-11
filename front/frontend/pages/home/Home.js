const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {
                psink: 'publication_sink',
                pread_path: APIRoutes.entity('publication', 'POST', true),
            },
        };
    },
    components: {
    },
    methods: {

    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.psink,
            path: this.state.pread_path,
            body: {
                size: 3,
            },
        });
    },
};
