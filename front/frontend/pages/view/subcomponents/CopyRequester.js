const APIRoutes = require('../../../../common/api/routes');
const Messages = require('../../../../common/api/messages');
const LangMixin = require('../../../../common/mixins/LangMixin');
const UserMixin = require('../../../../common/mixins/UserMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, UserMixin, FormCleanerMixin, FormMixin],
    props: {
        loggedIn: { default: false, type: Boolean },
        trigger: { default: false, type: Boolean },
        item: { type: String, required: true },
    },
    data() {
        return {
            showModal: false,
            state: {
                sinks: {
                    creations: {
                        copy_request: 'copy_request_form',
                    },
                },
            },
        };
    },
    methods: {
        send_request() {
            const content = this.fcontent(this.state.sinks.creations.copy_request);
            this.$store.dispatch('create', {
                path: APIRoutes.custom('ipublication/request_copy'),
                form: this.state.sinks.creations.copy_request,
                body: content,
            });
        },
        closeModal() {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.creations.copy_request,
            });
            this.showModal = false;
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
    computed: {
        request_state() {
            return this.fstate(this.state.sinks.creations.copy_request);
        },
    },
    mounted() {
    },
};
