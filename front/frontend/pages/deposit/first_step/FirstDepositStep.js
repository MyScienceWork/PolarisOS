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
                search_id: '',
                sinks: {
                    reads: {
                        import: 'import_read',
                        analyze: 'analyze_read',
                    },
                },
                import_in_progress: false,
                import_state: 'nothing',
                analyze_in_progress: false,
                analyze_state: 'nothing',
            },
        };
    },
    methods: {
        grab_typology_form(form) {
            if (form == null) {
                this.state.typology.form = '';
                this.$emit('typology-change', this.state.typology.form, undefined);
                return;
            }

            const _id = form.value;
            const typology = this.typology_options.filter(t => t._id === _id);
            this.state.typology.form = typology[0].children[0].form;
            this.$emit('typology-change', this.state.typology.form, typology[0].children);
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
                    info: this.state.search_id,
                    type: 'doi',
                },
            });
            this.state.import_state = 'loading';
        },
        analyze_from_file(filename) {
            this.$store.dispatch('fetch', {
                path: APIRoutes.import(),
                method: 'POST',
                action: 'read',
                form: this.state.sinks.reads.analyze,
                body: {
                    info: filename,
                    type: 'pdf',
                },
            });
            this.state.analyze_state = 'loading';
        },
        show_success_read(sink) {
            const state = this.generate_import_state(sink);
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
        current_state_import(s) {
            this.dispatch(s, this, this.state.sinks.reads.import);
        },
        current_state_analyze(s) {
            this.dispatch(s, this, this.state.sinks.reads.analyze);
        },
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
        current_state_import() {
            return this.fstate(this.state.sinks.reads.import);
        },
        current_state_analyze() {
            return this.fstate(this.state.sinks.reads.analyze);
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.import,
            keep_content: false,
        });
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.analyze,
            keep_content: false,
        });
    },
};
