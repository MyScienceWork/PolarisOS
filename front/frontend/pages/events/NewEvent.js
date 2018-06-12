const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        event: APIRoutes.entity('event', 'POST', true),
                        event_forms: APIRoutes.entity('form', 'POST', true),
                    },
                    creations: {
                        event: APIRoutes.entity('event', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        event: 'event_read',
                        event_forms: 'event_forms_read',
                    },
                    creations: {
                        event: 'event_creation',
                    },
                },
            },
        };
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.event_forms,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.event_forms,
            path: this.state.paths.reads.event_forms,
            body: {
                where: {
                    name: ['event_form'],
                },
            },
        });
    },
    computed: {
        event_form() {
            const content = this.fcontent(this.state.sinks.reads.event_forms);
            if (!(content instanceof Array) || content.length === 0) {
                return () => [];
            }
            if (content.length > 0) {
                return content[0];
            }
            return [];
        },
    },
};
