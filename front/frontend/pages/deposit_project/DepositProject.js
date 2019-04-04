const _ = require('lodash');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const UserMixin = require('../../../common/mixins/UserMixin');

const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const ReviewModal = require('./subcomponents/ReviewModal.vue');

module.exports = {
    mixins: [LangMixin, RequestsMixin, FormMixin, FormCleanerMixin, UserMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        project: 'project_creation',
                    },
                    reads: {
                        user_forms: 'user_forms_read',
                        project: 'project_read',
                        workflow: 'workflow_read',
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
                        workflow: APIRoutes.entity('workflow', 'POST', true),
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
        review_project() {
            console.log('review project');
            const content = this.fcontent(this.state.sinks.creations.project);
            this.$store.dispatch('update', {
                form: this.state.sinks.creations.project,
                path: this.state.paths.creations.project,
                body: content,
            });
        },
        after_status() {
            const workflows = this.fcontent(this.state.sinks.reads.workflow);
            let filtered_states = [];
            const content = this.fcontent(this.state.sinks.creations.project);
            const state_before = content.state;
            const workflow_name = this.$route.query.workflow;
            const idx = _.findIndex(workflows, workflow => workflow.name === workflow_name);
            if (idx !== -1) {
                workflows[idx].steps.forEach((step) => {
                    if (step.roles.length > 0) {
                        step.roles.some((role_workflow) => {
                            const indexRole = _.findKey(this.roles, role_user => role_user._id === role_workflow._id);
                            const indexState = _.findKey(step.state_before, step_state_before => step_state_before.label === state_before);
                            if (indexRole !== undefined && indexState !== undefined) {
                                filtered_states = filtered_states.concat(step.state_after);
                                return true;
                            }
                            return false;
                        });
                    }
                });
            }
            return filtered_states;
        },
        project_type_change(form) {
            if (!form || !form.label || form.label === '') {
                if (this.state.project_subform_name) {
                    this.state.project_subform_name = '';
                    return;
                }
            }
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.state.sinks.creations.project,
                name: 'type',
                info: form.label,
            });
            this.state.project_subform_name = `${this.state.project_form_name}_${form.label.toLowerCase()}`;
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads.user_forms,
                keep_content: false,
            });
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
        },
    },
    components: {
        ReviewModal,
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
        initial_state() {
            const workflows = this.fcontent(this.state.sinks.reads.workflow);
            if (workflows instanceof Array && workflows.length > 0) {
                const idx = _.findIndex(workflows, workflow => workflow.entity === 'project');
                if (idx !== -1 && workflows[idx].initial_state) {
                    return workflows[idx].initial_state;
                }
            }
            return '';
        },
        project_type_options() {
            const content = this.fcontent(this.state.sinks.reads.project_type);
            if (!(content instanceof Array)) {
                return [];
            }
            return content;
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
            form: this.state.sinks.reads.workflow,
            path: this.state.paths.reads.workflow,
            body: {
                size: 10000,
            },
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.project_type,
            path: this.state.paths.reads.project_type,
            body: {
                size: 10000,
            },
        });
    },
};
