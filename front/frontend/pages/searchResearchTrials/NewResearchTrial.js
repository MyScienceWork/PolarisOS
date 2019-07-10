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
                        research_trial: APIRoutes.entity('research_trial', 'POST', true),
                        research_trial_forms: APIRoutes.entity('form', 'POST', true),
                    },
                    creations: {
                        research_trial: APIRoutes.entity('research_trial', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        research_trial: 'research_trial_read',
                        research_trial_forms: 'research_trial_forms_read',
                    },
                    creations: {
                        research_trial: 'research_trial_creation',
                    },
                },
            },
        };
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.research_trial_forms,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.research_trial_forms,
            path: this.state.paths.reads.research_trial_forms,
            body: {
                where: {
                    name: ['research_trial_form'],
                },
            },
        });
    },
    computed: {
        research_trial_form() {
            const content = this.fcontent(this.state.sinks.reads.research_trial_forms);
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
