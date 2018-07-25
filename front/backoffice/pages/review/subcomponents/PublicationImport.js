const APIRoutes = require('../../../../common/api/routes');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

module.exports = {
    mixins: [FormCleanerMixin, FormMixin, LangMixin],
    props: {},
    data() {
        return {
            state: {
                sinks: {
                    reads: {

                    },
                    creations: {
                        import: 'import_creation',
                        import_results: 'import_results_creation',
                    },
                },
                error: undefined,
                in_progress: false,
            },
        };
    },
    methods: {
        import_publications() {
            this.state.error = undefined;
            const content = this.fcontent(this.state.sinks.creations.import);
            console.log(content);
            if (!('filetype' in content)) {
                this.state.error = 'l_select_filetype_error';
                return;
            }

            if (!('url' in content)) {
                this.state.error = 'l_choose_file_error';
                return;
            }

            this.$store.dispatch('search', {
                form: this.state.sinks.creations.import_results,
                path: APIRoutes.import(content.filetype),
                body: {
                    filepath: content.url,
                },
            });

            this.state.in_progress = true;
        },
        show_success(sink) {
            if (sink !== this.state.sinks.creations.import_results) {

            }
        },
    },
    watch: {
        current_state(ns) {
            this.dispatch(ns, this.state.sinks.creations.import_results);
        },
    },
    computed: {
        filetype_content() {
            return [
                {
                    label: 'l_filetype_ris_bimport',
                    value: 'ris',
                },
                {
                    label: 'l_filetype_endnote_bimport',
                    value: 'endnote',
                },
                {
                    label: 'l_filetype_bibtex_bimport',
                    value: 'bibtex',
                },
            ];
        },
        current_state() {
            return this.fstate(this.state.sinks.creations.import_results);
        },
        results() {
            return this.fcontent(this.state.sinks.creations.import_results);
        },
    },

};
