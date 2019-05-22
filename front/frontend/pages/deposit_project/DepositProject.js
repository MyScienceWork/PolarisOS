const _ = require('lodash');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const WorkflowMixin = require('../../../common/mixins/WorkflowMixin');

const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');

module.exports = {
    mixins: [LangMixin, RequestsMixin, FormMixin, FormCleanerMixin, UserMixin, WorkflowMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        project: 'project_creation',
                        project_type: 'project_creation_type',
                    },
                    reads: {
                        user_forms: 'user_forms_read',
                        project: 'project_read',
                        project_type: 'project_type_read',
                    },
                },
                paths: {
                    creations: {
                        project: APIRoutes.entity('project', 'POST'),
                    },
                    reads: {
                        user_forms: APIRoutes.entity('form', 'POST', true),
                        project: APIRoutes.entity('project', 'POST', true),
                        project_type: APIRoutes.entity('project_type', 'POST', true),
                    },
                },
                statuses: {
                    creations: {
                        project: 'nc',
                    },
                },
                show_review_modal: false,
                project_form_name: 'deposit_project_form',
                project_subform_name: '',
                project_type: '',
            },
        };
    },
    methods: {
        workflow_name() {
            return this.$route.query.workflow;
        },
        is_editing() {
            return this.$route.query && this.$route.query._id;
        },
        show_error(sink) {
            if (sink === this.state.sinks.creations.project) {
                this.state.statuses.creations.project = 'nok';
            }
            setTimeout(() => {
                this.state.statuses.creations.project = 'nc';
            }, 10000);
        },
        show_success(sink) {
            if (sink === this.state.sinks.creations.project) {
                this.state.statuses.creations.project = 'ok';
            }
            setTimeout(() => {
                this.state.statuses.creations.project = 'nc';
            }, 3000);
        },
        open_review_modal() {
            this.state.show_review_modal = true;
        },
        project_type_change(form) {
            if (!form || !form.value || form.value === '') {
                if (this.state.project_subform_name) {
                    this.state.project_subform_name = '';
                    return;
                }
            }
            /*
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads.user_forms,
                keep_content: false,
            });
            */
            const forms = this.fcontent(this.state.sinks.reads.project_type);
            if (forms instanceof Array) {
                form.name = forms.find(my_form => my_form._id === form.value).value;
            }
            this.state.project_subform_name = `${this.state.project_form_name}_${form.name.toLowerCase()}`;
            this.$store.dispatch('search', {
                form: this.state.sinks.reads.user_forms,
                path: this.state.paths.reads.user_forms,
                body: {
                    where: {
                        name: [this.state.project_subform_name],
                    },
                    population: ['fields.subform', 'fields.datasource'],
                },
            });
            /*
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.state.sinks.creations.project,
                name: 'type',
                info: form,
            });
            */
            this.$set(this.state, 'project_type', form.value);
        },
    },
    components: {
    },
    watch: {
    },
    computed: {
        project_id() {
            if (this.$route.query && this.$route.query._id) {
                return this.$route.query._id;
            }
            return '';
        },
        project_type() {
            return this.state.project_type;
        },
        project_type_options() {
            const content = this.fcontent(this.state.sinks.reads.project_type);
            if (!(content instanceof Array)) {
                return [];
            }
            return content;
        },
        depositor_user_id() {
            const content = this.fcontent(this.state.sinks.reads.project_type);
            if (content.depositor) {
                return content.depositor;
            }
            return this.m_user_id();
        },
    },
    beforeMount() {
        const query = this.$route.query;
        const id = query._id;

        if (id) {
            this.$store.state.requests.push({
                name: 'single_read',
                type: 'dispatch',
                content: {
                    form: this.state.sinks.creations.project,
                    path: APIRoutes.entity('project', 'GET', false, id),
                },
            });
            this.execute_requests().then(() => {}).catch(err => console.error(err));
        }
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.project_type,
            path: this.state.paths.reads.project_type,
            body: {
                size: 10000,
            },
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.user_forms,
            path: this.state.paths.reads.user_forms,
            body: {
                size: 10000,
            },
        });
    },
};
