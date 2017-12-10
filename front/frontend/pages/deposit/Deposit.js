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
            },
        };
    },
    methods: {
        update_typology_form(form) {
            this.fetch_form(form, this.state.publication.specs);
        },
        next_step(info) {
            const step = info.step;
            const event = info.e;

            if (step > this.state.current_step) {
                if (step === this.state.total_steps) {
                    EventHub.$emit('form-click-on-submit', event);
                } else {
                    this.state.next_step = step;
                    EventHub.$emit('form-click-on-validate', event);
                }
            } else {
                this.state.next_step = step;
                this.state.current_step = step;
                this.$store.commit(Messages.UPDATE_MODE_FORM, {
                    form: this.state.publication.sink,
                    update: true,
                    content: this.$store.state.forms[this.state.publication.sink].content,
                });
            }
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
        EventHub.$on('form-is-ready-for-submission', () => {
            this.state.current_step = this.state.next_step;
        });
    },
    computed: {
        unvalidated() {
            let content = {};
            if (this.state.publication.sink in this.$store.state.forms) {
                content = this.$store.state.forms[this.state.publication.sink].content || {};
            }
            return this.state.next_step === 2
                && Object.keys(content.validations || {}).length > 0;
        },
    },
};
