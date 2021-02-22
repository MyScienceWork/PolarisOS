const _ = require('lodash');
const LangMixin = require('../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        datasetSpecs: { type: String, required: true },
        creationSink: { type: String, required: true },
        success: { type: Boolean, default: false },
        review: { type: Boolean, default: false },
    },
    data() {
        return {
            state: {
            },
        };
    },
    computed: {
        form() {
            if (this.datasetSpecs in this.$store.state.forms) {
                const sink = this.$store.state.forms[this.datasetSpecs];
                const content = sink.content || {};
                return content;
            }
            return {};
        },
    },
};
