const _ = require('lodash');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const UserMixin = require('../../../common/mixins/UserMixin');

const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');

module.exports = {
    mixins: [LangMixin, RequestsMixin, FormMixin, FormCleanerMixin, UserMixin],
    data() {
        return {
        };
    },
    methods: {
    },
    components: {
    },
    watch: {
    },
    computed: {
    },
    beforeMount() {
    },
    mounted() {
    },
};
