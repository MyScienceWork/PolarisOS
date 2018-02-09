const LangMixin = require('../../../../common/mixins/LangMixin');
const APIRoutes = require('../../../../common/api/routes');

module.exports = {
    props: {
        typologySink: { required: true, type: String },
        creationSink: { required: true, type: String },
        publicationSpecs: { required: true, type: String },
    },
    mixins: [LangMixin],
    data() {
        return {
            state: {
                typology: {
                    name: '',
                    form: '',
                },
                search_id: '',
            },
        };
    },
    methods: {
        grab_typology_form(form) {
            const _id = form.value;
            const typology = this.typology_options.filter(t => t._id === _id);
            this.state.typology.form = typology[0].children[0].form;
            this.$emit('typology-change', this.state.typology.form, undefined);
        },
        import_from_id(e) {
            e.preventDefault();
            this.$store.dispatch('create', {
                path: APIRoutes.import(),
                body: {
                    // TODO remove hack
                    importer: this.import_form.fields[0].subform.fields[1].importer,
                    doi: this.state.search_id,
                },
            });
        },
    },
    computed: {
        typology_options() {
            if (this.typologySink in this.$store.state.forms) {
                const sink = this.$store.state.forms[this.typologySink];
                let content = sink.content || [];
                if (!(content instanceof Array)) {
                    content = [];
                }

                return content.map((t, i) => {
                    t.label = this.lang(t.label);
                    t.children = t.children.map((ch, j) => {
                        ch.label = this.lang(ch.label);
                        ch.path = `${i}.${j}`;
                        return ch;
                    });
                    return t;
                });
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
