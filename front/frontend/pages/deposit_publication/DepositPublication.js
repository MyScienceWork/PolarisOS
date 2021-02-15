const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const WorkflowMixin = require('../../../common/mixins/WorkflowMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const Handlebars = require('../../../../app/modules/utils/templating');

const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const ReviewModal = require('./subcomponents/ReviewModal.vue');

module.exports = {
    mixins: [LangMixin, RequestsMixin, FiltersMixin, FormMixin, FormCleanerMixin, UserMixin, WorkflowMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        publication: 'publication_creation',
                        publication_group: 'publication_group_creation',
                    },
                    reads: {
                        user_forms: 'user_forms_read',
                        publication: 'publication_read',
                        publication_group: 'publication_group_read',
                    },
                },
                paths: {
                    creations: {
                        publication: APIRoutes.entity('publication', 'POST'),
                    },
                    reads: {
                        user_forms: APIRoutes.entity('form', 'POST', true),
                        publication: APIRoutes.entity('publication', 'POST', true),
                        publication_group: APIRoutes.entity('publication_group', 'POST', true),
                    },
                },
                statuses: {
                    creations: {
                        publication: 'nc',
                    },
                },
                show_review_modal: false,
                selected_publication_group: '',
                selected_publication_form: '',
                workflow_entity: 'publication',
            },
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        is_editing() {
            return this.$route.query && this.$route.query._id;
        },
        review_publication() {
            const content = this.fcontent(this.state.sinks.creations.publication);
            this.$store.dispatch('update', {
                form: this.state.sinks.creations.publication,
                path: this.state.paths.creations.publication,
                body: content,
            });
        },
        show_error(sink) {
            if (sink === this.state.sinks.creations.publication) {
                this.state.statuses.creations.publication = 'nok';
            }
            setTimeout(() => {
                this.state.statuses.creations.publication = 'nc';
            }, 10000);
        },
        show_success(sink) {
            if (sink === this.state.sinks.creations.publication) {
                this.state.statuses.creations.publication = 'ok';
            }
            setTimeout(() => {
                this.state.statuses.creations.publication = 'nc';
            }, 3000);
        },
        open_review_modal() {
            this.state.show_review_modal = true;
        },
        publication_submitted() {
            // init publication type form choices
            this.state.selected_publication_form = '';
            this.state.selected_publication_group = '';

            this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                form: this.state.sinks.creations.publication_group,
                body: undefined,
            });
        },
        publication_group_change(form) {
            if (this.is_editing()) {
                return;
            }
            if (!form || !form.value || form.value === {}) {
                if (this.state.selected_publication_form) {
                    this.state.selected_publication_form = '';
                    this.state.selected_publication_group = '';
                    return;
                }
            }
            // Getting form name
            const { form_name } = this.fcontent(this.state.sinks.reads.publication_group)
                .find(o => o._id === form.value);
            this.$store.dispatch('search', {
                form: this.state.sinks.reads.user_forms,
                path: this.state.paths.reads.user_forms,
                body: {
                    where: {
                        name: [form_name],
                    },
                    population: ['fields.subform', 'fields.datasource'],
                },
            });
            this.state.selected_publication_form = form_name;
            this.state.selected_publication_group = form.value;
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.state.sinks.creations.publication,
                name: 'group',
                info: this.state.selected_publication_group,
            });
        },
    },
    components: {
        ReviewModal,
    },
    watch: {
    },
    computed: {
        historys() {
            const content = this.fcontent(this.state.sinks.creations.publication);

            const allStatus = this.all_status();
            let new_content = [];
            let has_deposit_date = false;

            if (content.deposit_date) {
                has_deposit_date = true;
                new_content.push({
                    step: 0,
                    denormalization: {
                        label: 'l_deposit',
                    },
                    updated_date: parseInt(content.deposit_date),
                },
                );
            }

            if (!content || !(content.history)) {
                return new_content;
            }

            if (Object.keys(content.history).length > 0) {
                new_content = Object.keys(content.history).reduce((obj, my_history_index) => {
                    let history_index = parseInt(my_history_index, 10);
                    if (has_deposit_date) {
                        history_index += 1;
                    }

                    const sliced_history = JSON.parse(JSON.stringify(content.history));
                    const my_history = sliced_history[my_history_index];

                    my_history.denormalization = allStatus.find(d => d._id === my_history.state);
                    my_history.step = history_index;
                    if (my_history.updated_date) {
                        my_history.updated_date = parseInt(my_history.updated_date, 10);
                    } else {
                        const sliced_previous_history = JSON.parse(JSON.stringify(content.history[my_history_index - 1]));
                        my_history.updated_date = parseInt(sliced_previous_history.updated_date, 10);
                    }

                    obj.unshift(my_history);
                    return obj;
                }, new_content);
            }
            return new_content;
        },
        user_id() {
            return this.user._id;
        },
        updated_date() {
            return new Date().getTime();
        },
        show_form() {
            if (this.state.selected_publication_form !== '') {
                return () => true;
            }
            const content = this.fcontent(this.state.sinks.creations.publication);
            const form = content;
            if (!form || form.group === undefined || form.group === '') {
                return () => false;
            }
            // now get name of the form
            const forms = this.fcontent(this.state.sinks.reads.publication_group);
            if (!(forms instanceof Array)) {
                return () => false;
            }
            this.$store.dispatch('search', {
                form: this.state.sinks.reads.user_forms,
                path: this.state.paths.reads.user_forms,
                body: {
                    where: {
                        name: [this.state.selected_publication_form],
                    },
                    population: ['fields.subform', 'fields.datasource'],
                },
            });
            this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                form: this.state.sinks.creations.publication_group,
                body: { group: content.group },
            });
            return () => true;
        },
        publication_id() {
            if (this.$route.query && this.$route.query._id) {
                return this.$route.query._id;
            }
            return '';
        },
        depositor_user_id() {
            const content = this.fcontent(this.state.sinks.reads.publication);
            if (content.depositor) {
                return content.depositor;
            }
            return this.m_user_id();
        },
        creation_date() {
            return Handlebars.compile('{{moment unix=true}}')({});
        },
        publication_group_options() {
            const content = this.fcontent(this.state.sinks.reads.publication_group);
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
                    form: this.state.sinks.creations.publication,
                    path: APIRoutes.entity('publication', 'GET', false, id),
                },
            });
            this.execute_requests().then(() => {}).catch(err => console.error(err));
        }
    },
    mounted() {
        this.$store.dispatch('search',
            {
                form: this.state.sinks.reads.publication_group,
                path: this.state.paths.reads.publication_group,
                body: {
                    size: 10000,
                },
            },
        );
        this.$store.dispatch('search',
            {
                form: this.state.sinks.reads.user_forms,
                path: this.state.paths.reads.user_forms,
                body: {
                    size: 10000,
                },
            },
        );
    },
};
