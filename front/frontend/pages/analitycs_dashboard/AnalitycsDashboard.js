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
            return `https://analitycs-${window.location.host}/app/kibana#/dashboard/8c85a970-df6d-11e9-a2c6-99b64336e7cf?embed=true`;
        },
    },
    beforeMount() {
    },
    mounted() {
    },
};
