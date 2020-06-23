const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

const FileDepositWidget = require('../subcomponents/FileDepositWidget.vue');
const ImportCompletionWidget = require('../subcomponents/ImportCompletionWidget.vue');

module.exports = {
    props: {
        creationSink: { required: true, type: String },
        importSink: { required: true, type: String },
        importForm: { required: true },
        uploadForm: { required: true },
        publicationType: { required: true },
        typologyOptions: { required: true, type: Array },
        subtypologyOptions: { required: true, type: Array },
        reviewMode: { default: false, type: Boolean },
        modificationMode: { default: false, type: Boolean },
        noDepositedFiles: { default: false, type: Boolean },
        importState: { required: true, type: String },
        analyzeState: { required: true, type: String },
        allowGrobid: { default: true, type: Boolean },
    },
    components: {
        FileDepositWidget,
        ImportCompletionWidget,
    },
    mixins: [LangMixin, FormMixin],
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
        import_from_id() {
            this.$emit('import-from-id');
        },
    },
    watch: {
    },
    computed: {
    },
    mounted() {
    },
};
