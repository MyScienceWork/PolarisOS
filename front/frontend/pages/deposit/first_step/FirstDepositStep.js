const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const APIRoutes = require('../../../../common/api/routes');
const Messages = require('../../../../common/api/messages');

module.exports = {
    props: {
        typologySink: { required: true, type: String },
        subtypologySink: { required: true, type: String },
        creationSink: { required: true, type: String },
        publicationSpecs: { required: true, type: String },
        review: { default: false, type: Boolean },
        validated: { default: false, type: Boolean },
        modification: { default: false, type: Boolean },
        model: { default: false, type: Boolean },
        newVersion: { default: false, type: Boolean },
        parentPublication: { default: '', type: String },
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
        show_success_read(sink) {
            const state = this.generate_import_state(sink);
            if (state === '') {
                return;
            }
            const content = this.fcontent(sink);
            if (Object.keys(content).length === 0) {
                this.state[state] = 'fail';
            } else {
                this.state[state] = 'success';
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: this.creationSink,
                    body: content,
                });
            }
        },
        show_error(sink) {
            const state = this.generate_import_state(sink);
            if (state === '') {
                return;
            }
            this.state[state] = 'fail';
        },
        generate_import_state(sink) {
            switch (sink) {
            case this.state.sinks.reads.import:
                return 'import_state';
            case this.state.sinks.reads.analyze:
                return 'analyze_state';
            default:
                return '';
            }
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
        upload_form() {
            if (this.publicationSpecs in this.$store.state.forms) {
                const sink = this.$store.state.forms[this.publicationSpecs];
                const content = sink.content || {};
                if ('fields' in content) {
                    return Object.assign({}, content, { fields: content.fields.filter(field =>
                        field.name === 'upload' && field.type === 'subform') });
                }
                return content;
            }
            return {};
        },
        import_form() {
            if (this.publicationSpecs in this.$store.state.forms) {
                const sink = this.$store.state.forms[this.publicationSpecs];
                const content = sink.content || {};
                if ('fields' in content) {
                    return Object.assign({}, content, { fields: content.fields.filter(field =>
                        field.name === 'import' && field.type === 'subform') });
                }
                return content;
            }
            return {};
        },
    },
};
