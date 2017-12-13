const LangMixin = require('../../../../common/mixins/LangMixin');

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
            },
        };
    },
    methods: {
        grab_typology_form(form) {
            this.state.typology.form = form;
            this.$emit('typology-change', form, undefined);
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
    },
};
