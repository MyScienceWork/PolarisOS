const APIRoutes = require('../../../common/api/routes');
const FirstDepositStep = require('./first_step/FirstDepositStep.vue');
const SecondDepositStep = require('./second_step/SecondDepositStep.vue');
const ReviewStep = require('./review_step/ReviewStep.vue');
const FormMixin = require('../../../common/mixins/FormMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const Messages = require('../../../common/api/messages');
const EventHub = require('../../../common/store/event_hub');

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
                    validate_path: APIRoutes.entity('publication', 'VALIDATE'),
                },
                typology: {
                    path: APIRoutes.entity('typology', 'GET'),
                    sink: 'typology_read',
                },
                forms: {
                    name: 'typology_form',
                    fname: 'typology',
                },
                current_step: 0,
                next_step: 0,
                total_steps: 5,
                stepper: {
                    next: undefined,
                    e: undefined,
                },
                deposit_form_name: undefined,
            },
        };
    },
    methods: {
        update_typology_form(form, name) {
            this.state.deposit_form_name = form;
            if (form !== '') {
                this.fetch_form(form, this.state.publication.specs);
            } else {
                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.publication.specs,
                    keep_content: false,
                });
            }
        },
        next(func, step, total, e) {
            e.preventDefault();

            this.$store.commit(Messages.COLLECT, {
                form: this.state.publication.sink,
            });

            this.state.next_step = step + 1;
            this.state.stepper.next = func;
            this.state.stepper.e = e;
        },
        previous(func, step, total, e) {
            e.preventDefault();
            this.state.next_step = step;
            this.state.current_step = step - 1;
            func(e);
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.publication.sink,
                keep_content: true,
            });
        },
        send_information() {
            if (this.state.current_step === 0) {
                if (this.state.deposit_form_name) {
                    this.state.current_step = this.state.next_step;
                    this.state.stepper.next(this.state.stepper.e);
                }

                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.publication.sink,
                    keep_content: true,
                });
            }
        },
        show_success_validate() {
            this.state.current_step = this.state.next_step;
            this.state.stepper.next(this.state.stepper.e);
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.publication.sink,
                keep_content: true,
            });
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

        if (!query) {
            this.execute_requests().then(() => {}).catch(err => console.error(err));
            return;
        }

        const type = query.type;
        const id = query._id;

        if (!id || !type) {
            this.execute_requests().then(() => {}).catch(err => console.error(err));
            return;
        }

        switch (type) {
        default:
        case 'review':
        case 'model':
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
            }
            return 'default';
        },
        path() {
            if (this.state.current_step === 0) {
                return '';
            } else if (this.state.current_step < this.state.total_steps && this.state.next_step !== this.state.total_steps) {
                return this.state.publication.validate_path;
            }

            if (this.is_review_mode) {
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
