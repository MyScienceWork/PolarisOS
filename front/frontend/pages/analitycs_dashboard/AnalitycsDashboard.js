const _ = require('lodash');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const UserMixin = require('../../../common/mixins/UserMixin');

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
        route_dashboard() {
            return `${window.location.origin}/app/kibana#/dashboard/abb46710-7d60-11e9-8a19-69b7396e45c9?embed=true`;
        },
    },
    beforeMount() {
    },
    mounted() {
    },
};
