const APIRoutes = require('../../../common/api/routes');
const FirstDepositStep = require('./first_step/FirstDepositStep.vue');
const SecondDepositStep = require('./second_step/SecondDepositStep.vue');
const ReviewStep = require('./review_step/ReviewStep.vue');
const FormMixin = require('../../../common/mixins/FormMixin');
const Messages = require('../../../common/api/messages');
const EventHub = require('../../../common/store/event_hub');

module.exports = {
    mixins: [FormMixin],
    data() {
        return {
            state: {
                publication: {
                    sink: 'publication_creation',
                    specs: 'publication_specs',
                    path: APIRoutes.entity('publication', 'POST'),
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
            },
        };
    },
    methods: {
        update_typology_form(form, name) {
            this.fetch_form(form, this.state.publication.specs);
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
                this.state.current_step = this.state.next_step;
                this.state.stepper.next(this.state.stepper.e);
                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.publication.sink,
                    keep_content: true,
                });
            }
        },
        show_success_validate() {
            console.log('show success deposit');
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
        this.$store.dispatch('search', {
            form: this.state.typology.sink,
            path: this.state.typology.path,
            body: {
                size: 10000,
            },
        });
    },
    computed: {
        form_mode() {
            if (this.state.current_step === 0) {
                return 'default';
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
            return this.state.publication.path;
        },
        current_state() {
            return this.fstate(this.state.publication.sink);
        },
        unvalidated() {
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
        [this.state.publication.sink, this.state.publication.specs, this.state.typology.sink].forEach((c) => {
            this.$store.commit(Messages.INITIALIZE, {
                form: c,
            });
        });
    },
};
