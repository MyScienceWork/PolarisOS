const LangMixin = require('../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        loggedIn: { default: false, type: Boolean },
        trigger: { default: false, type: Boolean },
    },
    data() {
        return {
            showModal: false,
        };
    },
    methods: {
        send_request() {

        },
    },
    watch: {
        showModal(sm) {
            this.showModal = sm;
            this.$emit('update:trigger', sm);
        },
        trigger(t) {
            this.showModal = t;
        },
    },
};
