const _ = require('lodash');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        datasetSpecs: { type: String, required: true },
        creationSink: { type: String, required: true },
        depositForm: { type: String, required: true },
        subformName: { type: String, default: 'required' },
        validated: { type: Boolean, default: true },
    },
    methods: {
        refetch_form() {
            this.$emit('refetch-form');
        },
    },
    computed: {
        subform() {
            if (this.datasetSpecs in this.$store.state.forms) {
                const sink = this.$store.state.forms[this.datasetSpecs];
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
