const _ = require('lodash');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        publicationSpecs: { type: String, required: true },
        creationSink: { type: String, required: true },
        depositForm: { type: String, required: true },
        subformName: { type: String, default: 'required' },
        validated: { type: Boolean, default: true },
    },
    methods: {
        refetch_form(val) {
            console.log('fetch form');
            this.fetch_form(this.depositForm, this.publicationSpecs);
        },
    },
    computed: {
        subform() {
            if (this.publicationSpecs in this.$store.state.forms) {
                const sink = this.$store.state.forms[this.publicationSpecs];
                const content = sink.content || {};
                if ('fields' in content) {
                    return Object.assign({}, content,
                        { fields: content.fields.filter(field => field.name === this.subformName && field.type === 'subform') });
                }
                return {};
            }
            return {};
        },
    },
};
