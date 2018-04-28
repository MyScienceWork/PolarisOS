const _ = require('lodash');
const Vue = require('vue');
const APIRoutes = require('../api/routes');
const Messages = require('../api/messages');
const FormMixin = require('./FormMixin');
const RequestsMixin = require('./RequestsMixin');

module.exports = {
    mixins: [RequestsMixin, FormMixin],
    methods: {
        mcontent(sink) {
            const content = this.fcontent(sink);
            if (!(content instanceof Array)) {
                return [];
            }
            return content;
        },
        mlength(sink) {
            return this.mcontent(sink).length;
        },
        merror(sink) {
            const myform = this.fform(sink);
            if (Object.keys(myform).length > 0) {
                return myform.error;
            }
            return {};
        },
        mcurrent_read_state(sink) {
            return this.fstate(sink);
        },
        mwerror(sink) {
            return (n) => {
                if (n && Object.keys(n).length > 0) {
                    console.error(n.content.message);
                        // toastr.error(n.content.message);
                }
            };
        },
        mwcurrent_read_state(sink) {
            return s => this.dispatch(s, this, sink);
        },
        update(obj, entity) {
            this.$store.commit(Messages.NOOP, {
                form: this.state.sinks.creations[entity],
            });

            Vue.nextTick(() => {
                this.$store.commit(Messages.READ, {
                    form: this.state.sinks.creations[entity],
                    content: obj,
                });
            });
        },
        use_as_model(obj, entity) {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.creations[entity],
                keep_content: false,
            });
            this.$store.commit(Messages.NOOP, {
                form: this.state.sinks.creations[entity],
            });

            Vue.nextTick(() => {
                const body = _.cloneDeep(obj);
                delete body._id;
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: this.state.sinks.creations[entity],
                    body,
                });
            });
        },
        remove(obj, entity) {
            this.$store.dispatch('remove', {
                form: this.state.sinks.reads[entity],
                path: APIRoutes.entity(entity, 'DEL', false, obj._id),
                rpath: this.state.paths.reads[entity],
                rform: this.state.sinks.reads[entity],
            });
        },
    },
    computed: {
        requests() {
            return this.$store.state.requests;
        },
    },

    watch: {
        requests() {
            const requests = this.$store.state.requests;
            if (requests.length === 0) {
                return;
            }

            this.execute_requests().then(() => {}).catch(err => console.error(err));
        },
    },
    mounted() {
    },
};
