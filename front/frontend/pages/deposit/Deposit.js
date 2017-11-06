const APIRoutes = require('../../api/routes');
const FirstDepositStep = require('./first_step/FirstDepositStep.vue');
const SecondDepositStep = require('./second_step/SecondDepositStep.vue');
const FormMixin = require('../../mixins/FormMixin');

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
                    group: 'typology',
                },
            },
        };
    },
    methods: {
        update_typology_child(child) {
            this.state.typology_child = child.child;
            this.state.typology_child_path = child.path;
        },
    },
    components: {
        'first-deposit-step': FirstDepositStep,
        'second-deposit-step': SecondDepositStep,
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
