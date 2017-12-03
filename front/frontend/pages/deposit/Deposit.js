const APIRoutes = require('../../api/routes');
const FirstDepositStep = require('./first_step/FirstDepositStep.vue');
const SecondDepositStep = require('./second_step/SecondDepositStep.vue');
const ReviewStep = require('./review_step/ReviewStep.vue');
const FormMixin = require('../../../common/mixins/FormMixin');
const Messages = require('../../../common/api/messages');

module.exports = {
    mixins: [FormMixin],
    data() {
        return {
            state: {
                typology_child: undefined,
                typology_child_path: '',
                rpath: APIRoutes.entity('typology', 'GET'),
                rform: 'typology_read',
                forms: {
                    name: 'typology_form',
                    fname: 'typology',
                },
            },
        };
    },
    methods: {
        update_typology_child(child) {
            this.state.typology_child = child.child;
            this.state.typology_child_path = child.path;
        },
        next_step() {
            this.$store.commit(Messages.TOGGLE_RECLAIM_FORM, {
                form: 'deposit_creation',
                reclaim: true,
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
            form: this.state.rform,
            path: this.state.rpath,
            body: {
                size: 10000,
            },
        });
    },
};
