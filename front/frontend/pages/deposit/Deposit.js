const VueScrollTo = require('vue-scrollto');

const APIRoutes = require('../../../common/api/routes');
const BrowserUtils = require('../../../common/utils/browser');
const Messages = require('../../../common/api/messages');
const EventHub = require('../../../common/store/event_hub');

const FormMixin = require('../../../common/mixins/FormMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const FileAnalyzerMixin = require('./mixins/FileAnalyzerMixin');
const ImportMixin = require('./mixins/ImportMixin');

const FirstDepositStep = require('./first_step/FirstDepositStep.vue');
const SecondDepositStep = require('./second_step/SecondDepositStep.vue');
const ReviewStep = require('./review_step/ReviewStep.vue');
const ReviewModal = require('./subcomponents/ReviewModal.vue');

module.exports = {
    mixins: [FormMixin, RequestsMixin, ImportMixin, FileAnalyzerMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        publication: 'publication_creation',
                        // specs: 'publication_specs', //Expose by ImportMixin & FileAnalyzerMixin
                    },
                    reads: {
                        typology: 'typology_read',
                        subtypology: 'subtypology_read',
                    },
                },
                paths: {
                    creations: {
                        publication: APIRoutes.entity('publication', 'POST'), // Same path for PUT,
                        specs: 'publication_specs',
                    },
                    reads: {
                        publication: APIRoutes.entity('publication', 'GET'),
                        typology: APIRoutes.entity('typology', 'POST', true),
                    },
                    validations: {

                        publication: APIRoutes.entity('publication', 'VALIDATE', false, '0'),
                    },
                },
                forms: {
                    name: 'typology_form',
                    fname: 'typology',
                },
                current_step: 0,
                next_step: 0,
                prev_step: 0,
                total_steps: 5,
                stepper: {
                    next: undefined,
                },
                deposit_form_name: undefined,
                modal_has_been_validated: false,
                step_props: {},
            },
        };
    },
    methods: {
        update_typology_form(form, children, type_id) {
            if (form && form.trim !== '') {
                if (this.state.deposit_form_name !== form) {
                    this.$store.commit(Messages.INITIALIZE, {
                        form: this.state.sinks.creations.publication,
                    });
                    this.$store.commit(Messages.INITIALIZE, {
                        form: this.state.sinks.reads.subtypology,
                    });
                    this.$store.commit(Messages.INITIALIZE, {
                        form: this.state.sinks.creations.specs,
                    });

                    this.state.deposit_form_name = form;
                    this.fetch_form(form, this.state.sinks.creations.specs);
                    this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                        form: this.state.sinks.reads.subtypology,
                        body: { children },
                    });
                }
            } else {
                this.state.deposit_form_name = undefined;

                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.sinks.creations.publication,
                });
                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.sinks.reads.subtypology,
                });
                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.sinks.creations.specs,
                });
            }
        },
        run_next_or_previous(f) {
            f();
            VueScrollTo.scrollTo('#deposit-stepper', 500);
            const content = this.fcontent(this.state.sinks.creations.publication);
            BrowserUtils.localSet('saved_deposit', content);
        },
        update_step(info) {
            this.state.next_step = info.next_step;
            this.state.prev_step = info.prev_step;
            this.state.current_step = info.step;
        },
        next(func, step, total) {
            this.state.stepper.next = func;
            this.send_information(this.state.sinks.creations.publication);
        },
        previous(func, step, total) {
            this.run_next_or_previous(func);
            this.state.paths.validations.publication = APIRoutes.entity('publication',
                'VALIDATE', false, `0-${this.state.current_step + 1}`);
        },
        send_information(sink) {
            if (sink !== this.state.sinks.creations.publication) {
                return;
            }

            if (this.state.current_step === 0) {
                if (this.state.deposit_form_name) {
                    this.run_next_or_previous(this.state.stepper.next);
                    this.state.paths.validations.publication = APIRoutes.entity('publication',
                        'VALIDATE', false, `0-${this.state.current_step + 1}`);
                }
            } else if (this.in_mode('review') && this.state.modal_has_been_validated) {
                this.state.show_review_modal = false;
            } else {
                const content = this.fcontent(this.state.sinks.creations.publication);
                this.$store.dispatch(this.form_mode, {
                    form: this.state.sinks.creations.publication,
                    path: this.path,
                    body: content,
                });
            }
        },
        show_success_validate() {
            this.run_next_or_previous(this.state.stepper.next);

            this.state.paths.validations.publication = APIRoutes.entity('publication',
                'VALIDATE', false, `0-${this.state.current_step + 1}`);
        },
        show_success_read(sink) {
            this.handle_import(sink, this.state.sinks.creations.publication);
            this.handle_analyzed_file(sink, this.state.sinks.creations.publication);
        },
        show_error(sink) {
            this.acknowledge_import_error(sink);
            this.acknowledge_analyze_error(sink);
        },
        go_after_success() {
            BrowserUtils.localRemove('saved_deposit');
            this.$router.push({ path: '/' });
        },
        open_review_modal(props) {
            this.state.step_props = props;
            this.state.show_review_modal = true;
        },
        review_publication() {
            this.state.modal_has_been_validated = true;
            this.next(this.state.step_props.next, this.state.step_props.step,
                this.state.step_props.numberOfSteps);
        },
    },
    components: {
        'first-deposit-step': FirstDepositStep,
        'second-deposit-step': SecondDepositStep,
        'review-deposit-step': ReviewStep,
        ReviewModal,
    },
    mounted() {
        this.$store.state.requests.push({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads.typology,
                path: this.state.paths.reads.typology,
                body: {
                    size: 10000,
                    sort: [{ order: 'asc' }, { _uid: 'desc' }],
                },
            },
        });

        const query = this.$route.query;
        if (!query || (query && (!query.type || !query._id))) {
            const saved_deposit = BrowserUtils.localGet('saved_deposit');
            if (saved_deposit) {
                this.$store.state.requests.push({
                    name: Messages.TRANSFERT_INTO_FORM,
                    type: 'commit',
                    content: {
                        form: this.state.sinks.creations.publication,
                        body: saved_deposit,
                    },
                });
            }
            this.execute_requests().then(() => {}).catch(err => console.error(err));
            return;
        }

        const type = query.type;
        const id = query._id;

        switch (type) {
        default:
        case 'review':
        case 'model':
        case 'new_version':
        case 'modify':
            this.$store.state.requests.push({
                name: 'single_read',
                type: 'dispatch',
                content: {
                    form: this.state.sinks.creations.publication,
                    path: APIRoutes.entity('publication', 'GET', false, id),
                },
            });
            this.$store.state.requests.push({
                name: Messages.INITIALIZE,
                type: 'commit',
                content: {
                    form: this.state.sinks.creations.publication,
                    keep_content: true,
                },
            });
            break;
        }

        this.execute_requests().then(() => {}).catch(err => console.error(err));
    },
    computed: {
        form_mode() {
            if (this.state.current_step === 0) {
                return '';
            } else if (this.state.current_step < this.state.total_steps && this.state.next_step !== this.state.total_steps) {
                return 'validate';
            } else if (this.in_mode('review') || this.in_mode('modify')) {
                return 'update';
            }
            return 'create';
        },
        path() {
            if (this.state.current_step === 0) {
                return '';
            } else if (this.state.current_step < this.state.total_steps && this.state.next_step !== this.state.total_steps) {
                return this.state.paths.validations.publication;
            } else if (this.in_mode('review') || this.in_mode('modify')) {
                return this.state.paths.creations.publication;
            }
            return this.state.paths.creations.publication;
        },
        current_state() {
            return this.fstate(this.state.sinks.creations.publication);
        },
        unvalidated() {
            const form = this.fform(this.state.sinks.creations.publication);
            return Object.keys(form.validations || {}).length > 0;
        },
        success() {
            const form = this.fform(this.state.sinks.creations.publication);
            if (form && form.success) {
                if (form.success instanceof String) {
                    return form.success.trim() !== '';
                }
                return true;
            }
            return false;
        },
        in_mode() {
            // m = review / modify / model / new_version
            return m => this.$route.query && this.$route.query.type && this.$route.query.type === m;
        },
        publication_id() {
            if (this.$route.query && this.$route.query._id) {
                return this.$route.query._id;
            }
            return '';
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this);
        },
        mode(nm) {
            this.state.mode = nm;
        },
    },
    beforeDestroy() {
        // Destroy all forms
        this.$store.commit(Messages.REMOVE_ALL_FORMS, {});
    },
};
