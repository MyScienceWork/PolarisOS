const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                isActive: true,
            },
        };
    },
    components: {
    },
    methods: {
    },
    mounted() {
    },
    computed: {
    },
};
