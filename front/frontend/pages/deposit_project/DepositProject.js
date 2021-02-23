const _ = require('lodash');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const WorkflowMixin = require('../../../common/mixins/WorkflowMixin');
const Handlebars = require('../../../../app/modules/utils/templating');

const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');

module.exports = {
    mixins: [LangMixin, RequestsMixin, FormMixin, FormCleanerMixin, UserMixin, WorkflowMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        project: 'project_back',
                    },
                    reads: {
                        user_forms: 'user_forms_read',
                        project: 'project_read',
                    },
                },
                paths: {
                    creations: {
                        project: APIRoutes.entity('project', 'POST'),
                    },
                    reads: {
                        user_forms: APIRoutes.entity('form', 'POST', true),
                        project: APIRoutes.entity('project', 'POST', true),
                    },
                },
                statuses: {
                    creations: {
                        project: 'nc',
                    },
                },
                show_review_modal: false,
                project_form_name: 'project_front',
            },
        };
    },
    methods: {
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
        project_submitted() {
            // init project type form choices
            this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                form: this.state.sinks.creations.project,
                body: undefined,
            });
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
        depositor_user_id() {
            const content = this.fcontent(this.state.sinks.reads.project_type);
            if (content.depositor) {
                return content.depositor;
            }
            return this.m_user_id();
        },
        creation_date() {
            return Handlebars.compile('{{moment unix=true}}')({});
        },
        project_form() {
            const forms = this.fcontent(this.state.sinks.reads.user_forms);
            return _.find(forms, o => o.name === this.state.project_form_name);
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
            form: this.state.sinks.reads.user_forms,
            path: this.state.paths.reads.user_forms,
            body: {
                where: {
                    name: [this.state.project_form_name],
                },
                population: ['fields.subform', 'fields.datasource'],
            },
        });
    },
};
