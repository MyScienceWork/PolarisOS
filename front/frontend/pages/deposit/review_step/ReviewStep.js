const _ = require('lodash');
const LangMixin = require('../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        publicationSpecs: { type: String, required: true },
        creationSink: { type: String, required: true },
    },
    data() {
        return {
            state: {
            },
        };
    },
    computed: {
        form() {
            if (this.publicationSpecs in this.$store.state.forms) {
                const sink = this.$store.state.forms[this.publicationSpecs];
                const content = sink.content || {};
                return content;
            }
            return {};
        },
    },
};
