const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const APIRoutes = require('../../../../common/api/routes');
const Messages = require('../../../../common/api/messages');

module.exports = {
    props: {
        typologySink: { required: true, type: String },
        creationSink: { required: true, type: String },
        publicationSpecs: { required: true, type: String },
        review: { default: false, type: Boolean },
        validated: { default: false, type: Boolean },
    },
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                typology: {
                    name: '',
                    form: '',
                },
                search_id: '',
                sinks: {
                    reads: {
                        import: 'import_read',
                    },
                },
                import_in_progress: false,
                import_state: 'nothing',
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
            this.$store.dispatch('fetch', {
                path: APIRoutes.import(),
                method: 'POST',
                action: 'read',
                form: this.state.sinks.reads.import,
                body: {
                    // TODO remove hack
                    doi: this.state.search_id,
                },
            });
            this.state.import_state = 'loading';
        },
        show_success_read(sink) {
            if (sink !== this.state.sinks.reads.import) {
                return;
            }

            const content = this.fcontent(sink);

            if (Object.keys(content).length === 0) {
                this.state.import_state = 'fail';
            } else {
                this.state.import_state = 'success';
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: this.creationSink,
                    body: content,
                });
            }
        },
        show_error(sink) {
            if (sink !== this.state.sinks.reads.import) {
                return;
            }
            this.state.import_state = 'fail';
        },
    },
    watch: {
        current_state(s) {
            console.log('current_state', s);
            this.dispatch(s, this, this.state.sinks.reads.import);
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
        current_state() {
            return this.fstate(this.state.sinks.reads.import);
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.import,
            keepContent: false,
        });
    },
};
