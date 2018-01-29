const moment = require('moment');
const LangMixin = require('../../../../mixins/LangMixin');
const FormMixin = require('../../../../mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        text: { required: true, type: String },
        header: { default: '', type: String },
        help: { default: '', type: String },
        form: { required: true, type: String },
    },
    data() {
        return {
            state: {
                showForm: false,
                specs: `crud_form_${+moment()}`,
                cform: `crud_form_creation_${+moment()}`,
            },
        };
    },
    methods: {
        generate_form(e) {
            e.preventDefault();
            if (this.state.showForm) {
                this.state.showForm = false;
                return;
            }

            this.fetch_form(this.form, this.state.specs);
            this.state.showForm = true;
        },
    },
    computed: {
    },
};
