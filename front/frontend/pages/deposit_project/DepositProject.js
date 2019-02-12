const _ = require('lodash');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');

const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const ReviewModal = require('./subcomponents/ReviewModal.vue');

module.exports = {
    mixins: [LangMixin, RequestsMixin, FormMixin, FormCleanerMixin],
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
                    },
                },
                statuses: {
                    creations: {
                        project: 'nc',
                    },
                },
                show_review_modal: false,
            },
        };
    },
    methods: {
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
        open_review_modal(props) {
            this.state.show_review_modal = true;
        },
    },
    components: {
        ReviewModal,
    },
    watch: {
        project_id(id) {
            console.log('this is project id : ', id);
        },
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
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.user_forms,
            keep_content: false,
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.user_forms,
            path: this.state.paths.reads.user_forms,
            body: {
                where: {
                    name: ['project_form'],
                },
                population: ['fields.subform', 'fields.datasource'],
            },
        });
    },
};
