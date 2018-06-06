const NotificationMixin = require('./NotificationMixin');
const FormMixin = require('./FormMixin');

module.exports = {
    mixins: [NotificationMixin, FormMixin],
    methods: {
        show_success_delete(form) {
            if (form !== this.state.sinks.reads[this.state.my_entity]) {
                return;
            }
            this.notify(this.fsuccess(form) || '', 'error');
        },
    },
    watch: {
        current_state(state) {
            this.dispatch(state, this, this.state.sinks.reads[this.state.my_entity]);
        },
    },
    computed: {
        current_state() {
            return this.fstate(this.state.sinks.reads[this.state.my_entity]);
        },
    },
};
