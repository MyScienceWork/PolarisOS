const _ = require('lodash');
const LangMixin = require('../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        publicationSpecs: { type: String, required: true },
        creationSink: { type: String, required: true },
        subformName: { type: String, default: 'required' },
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
                return content;
            }
            return {};
        },
    },
};
