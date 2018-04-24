const APIRoutes = require('../../../common/api/routes');
const FirstDepositStep = require('./first_step/FirstDepositStep.vue');
const SecondDepositStep = require('./second_step/SecondDepositStep.vue');
const ReviewStep = require('./review_step/ReviewStep.vue');
const FormMixin = require('../../../common/mixins/FormMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const Messages = require('../../../common/api/messages');
const EventHub = require('../../../common/store/event_hub');
const VueScrollTo = require('vue-scrollto');
const BrowserUtils = require('../../../common/utils/browser');

module.exports = {
    mixins: [FormMixin, RequestsMixin],
    data() {
        return {
            state: {
                publication: {
                    sink: 'publication_creation',
                    specs: 'publication_specs',
                    path: APIRoutes.entity('publication', 'POST'),
                    put_path: APIRoutes.entity('publication', 'PUT'),
                    read_path: APIRoutes.entity('publication', 'GET'),
                    validate_path: APIRoutes.entity('publication', 'VALIDATE', false, '0'),
                },
                typology: {
                    path: APIRoutes.entity('typology', 'GET'),
                    sink: 'typology_read',
                    subsink: 'subtypology_read',
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
                show_review_modal: false,
                modal_has_been_validated: false,
                step_props: {},
                status_review: undefined,
            },
        };
    },
    methods: {
        run_next_or_previous(f) {
            f();
            VueScrollTo.scrollTo('#deposit-stepper', 500);
            const content = this.fcontent(this.state.publication.sink);
            BrowserUtils.localSet('saved_deposit', content);
        },
        update_step(info) {
            this.state.next_step = info.next_step;
            this.state.prev_step = info.prev_step;
            this.state.current_step = info.step;
        },
        update_typology_form(form, children) {
            if (!form || form === '' ||
                (form && form !== this.state.deposit_form_name && this.state.deposit_form_name)) {
                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.publication.specs,
                });

                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.publication.sink,
                });

                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.typology.subsink,
                });

                BrowserUtils.localRemove('saved_deposit');
            }
            if (form !== '') {
                this.state.deposit_form_name = form;
                this.fetch_form(form, this.state.publication.specs);
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: this.state.typology.subsink,
                    body: { children },
                });
            }
        },
        next(func, step, total, no_collect = false) {
            if (!no_collect) {
                this.$store.commit(Messages.COLLECT, {
                    form: this.state.publication.sink,
                });
            }

            this.state.stepper.next = func;
        },
        previous(func, step, total) {
            this.run_next_or_previous(func);
            this.state.publication.validate_path = APIRoutes.entity('publication',
                'VALIDATE', false, `0-${this.state.current_step + 1}`);

            this.$store.commit(Messages.COLLECT, {
                form: this.state.publication.sink,
            });
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.publication.sink,
                keep_content: true,
            });
        },
        send_information() {
            if (this.state.current_step === 0) {
                if (this.state.deposit_form_name) {
                    this.run_next_or_previous(this.state.stepper.next);
                    this.state.publication.validate_path = APIRoutes.entity('publication',
                        'VALIDATE', false, `0-${this.state.current_step}`);
                }

                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.publication.sink,
                    keep_content: true,
                });
            } else if (this.is_review_mode && this.state.modal_has_been_validated) {
                this.state.show_review_modal = false;
            }
        },
        show_success_validate() {
            this.state.publication.validate_path = APIRoutes.entity('publication',
                'VALIDATE', false, `0-${this.state.current_step + 1}`);
            this.run_next_or_previous(this.state.stepper.next);
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.publication.sink,
                keep_content: true,
            });
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
        status_review_change(val) {
            this.state.status_review = val ? val.value : undefined;
        },
    },
    components: {
        'first-deposit-step': FirstDepositStep,
        'second-deposit-step': SecondDepositStep,
        'review-deposit-step': ReviewStep,
    },
    mounted() {
        this.$store.state.requests.push({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.typology.sink,
                path: this.state.typology.path,
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
                        form: this.state.publication.sink,
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
                    form: this.state.publication.sink,
                    path: APIRoutes.entity('publication', 'GET', false, id),
                },
            });
            this.$store.state.requests.push({
                name: Messages.INITIALIZE,
                type: 'commit',
                content: {
                    form: this.state.publication.sink,
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
            } else if (this.is_review_mode || this.is_modification_mode) {
                return 'update';
            }
            return 'default';
        },
        path() {
            if (this.state.current_step === 0) {
                return '';
            } else if (this.state.current_step < this.state.total_steps && this.state.next_step !== this.state.total_steps) {
                return this.state.publication.validate_path;
            }

            if (this.is_review_mode || this.is_modification_mode) {
                return this.state.publication.put_path;
            }
            return this.state.publication.path;
        },
        current_state() {
            return this.fstate(this.state.publication.sink);
        },
        unvalidated() {
            if (!this.state.deposit_form_name) {
                return true;
            }

            let form = {};
            if (this.state.publication.sink in this.$store.state.forms) {
                form = this.$store.state.forms[this.state.publication.sink] || {};
            }
            return Object.keys(form.validations || {}).length > 0;
        },
        success() {
            if (this.state.publication.sink in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.publication.sink];
                if (form.success) {
                    if (form.success instanceof String) {
                        return form.success.trim() !== '';
                    }
                    return true;
                }
                return false;
            }
            return false;
        },
        is_review_mode() {
            return this.$route.query && this.$route.query.type && this.$route.query.type === 'review';
        },
        is_modification_mode() {
            return this.$route.query && this.$route.query.type && this.$route.query.type === 'modify';
        },
        is_new_version_mode() {
            return this.$route.query && this.$route.query.type && this.$route.query.type === 'new_version';
        },
        publication_id() {
            if (this.$route.query && this.$route.query._id) {
                return this.$route.query._id;
            }
            return '';
        },
        status_options() {
            return ['pending', 'rejected',
                'incomplete', 'published', 'withdrawn']
            .map(s => ({ label: this.lang(`l_${s}_status`), value: s }));
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
