const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

const FileDepositWidget = require('../subcomponents/FileDepositWidget.vue');
const ImportCompletionWidget = require('../subcomponents/ImportCompletionWidget.vue');

module.exports = {
    props: {
        typologySink: { required: true, type: String },
        subtypologySink: { required: true, type: String },
        creationSink: { required: true, type: String },
        publicationSpecs: { required: true, type: String },
        importSink: { required: true, type: String },
        importForm: { required: true },
        uploadForm: { required: true },
        reviewMode: { default: false, type: Boolean },
        modificationMode: { default: false, type: Boolean },
        importState: { required: true, type: String },
        analyzeState: { required: true, type: String },
    },
    components: {
        FileDepositWidget,
        ImportCompletionWidget,
    },
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                typology: {
                    name: '',
                    form: '',
                },
            },
        };
    },
    methods: {
        grab_typology_form(form) {
            if (form == null) {
                this.state.typology.form = '';
                this.$emit('typology-change', this.state.typology.form, undefined, undefined);
                return;
            }

            const _id = form.value;
            const typology = this.typology_options.filter(t => t._id === _id);
            this.state.typology.form = typology[0].children[0].form;
            this.$emit('typology-change', this.state.typology.form, typology[0].children, _id);
        },
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
        typology_options() {
            const content = this.fcontent(this.typologySink);
            if (!(content instanceof Array)) {
                return [];
            }

            return content.map((t, i) => {
                t.label = this.lang(t.label);
                t.children = t.children.map((ch, j) => {
                    ch.tlabel = this.lang(ch.label);
                    ch.path = `${i}.${j}`;
                    return ch;
                });
                return t;
            });
        },
        subtypology_options() {
            const content = this.fcontent(this.subtypologySink);

            if ('children' in content) {
                return content.children;
            }

            return [];
        },
    },
};
