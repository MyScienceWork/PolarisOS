const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const FiltersMixin = require('../../../../common/mixins/FiltersMixin');


module.exports = {
    mixins: [LangMixin, FormMixin, FiltersMixin],
    props: {
        sink: { required: true, type: String },
        uploadForm: { required: true },
        analyzeState: { required: true, type: String },
        modificationMode: { default: false, type: Boolean },
    },
    data() {
        return {
            state: {
            },
        };
    },
    methods: {
        analyze_from_file(filename) {
            this.$emit('analyze-from-file', filename);
        },
    },
};
