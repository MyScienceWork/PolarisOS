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
            state: {
                sinks: {
                    reads: {
                        user_forms: 'user_forms_read',
                    },
                    creations: {
                        diseases: 'diseases_creation',
                    },
                },
                paths: {
                    reads: {
                        user_forms: APIRoutes.entity('form', 'POST', true),
                    },
                },
            },
        };
    },
    methods: {
    },
    components: {
    },
    watch: {
    },
    computed: {
        user_forms() {
            const content = this.fcontent(this.state.sinks.reads.user_forms);
            if (!(content instanceof Array) || content.length === 0) {
                return () => [];
            }
            return (f) => {
                const r = content.filter(c => c.name === f);
                if (r.length > 0) {
                    return r[0];
                }
                return [];
            };
        },
    },
    beforeMount() {
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.user_forms,
            keep_content: false,
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.user_forms,
            path: this.state.paths.reads.user_forms,
            body: {
                where: {
                    name: ['find_diseases_form'],
                },
                population: ['fields.subform', 'fields.datasource'],
            },
        });
    },
};
