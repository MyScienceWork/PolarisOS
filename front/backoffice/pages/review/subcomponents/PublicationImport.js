const APIRoutes = require('../../../../common/api/routes');
const Messages = require('../../../../common/api/messages');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const ReaderMixin = require('../../../../common/mixins/ReaderMixin');
const FiltersMixin = require('../../../../common/mixins/FiltersMixin');
const OAMixin = require('../../../../common/mixins/ObjectAccessMixin');
const ESQueryMixin = require('../../../../common/mixins/ESQueryMixin');
const RemoveMixin = require('../../../../common/mixins/RemoveMixin');

module.exports = {
    mixins: [FormCleanerMixin, FormMixin, LangMixin, ReaderMixin, FiltersMixin, OAMixin, ESQueryMixin, RemoveMixin],
    props: {},
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        system_report: 'report_read',
                    },
                    creations: {
                        import: 'import_creation',
                        search: 'import_report_creation_search',
                        system_report: 'report_creation',
                    },
                },
                paths: {
                    reads: {
                        system_report: APIRoutes.entity('system_report', 'POST', true),
                    },
                },
                error: undefined,
                es_query_id: 'backoffice-report-query',
                in_progress: false,
                succeeded: false,
                my_entity: 'report',
                columns: {
                    name: {
                        visible: true,
                        force: true,
                        title: 'l_ir_name',
                        sortable: true,
                    },
                    created_at: {
                        visible: true,
                        force: false,
                        title: 'l_ir_created_at',
                        sortable: true,
                    },
                    'report.success': {
                        visible: true,
                        force: false,
                        title: 'l_ir_success',
                        sortable: true,
                    },
                    'report.errors': {
                        visible: true,
                        force: false,
                        title: 'l_ir_errors',
                        sortable: true,
                    },
                    'report.total': {
                        visible: true,
                        force: false,
                        title: 'l_ir_total',
                        sortable: true,
                    },
                    status: {
                        visible: true,
                        force: true,
                        title: 'l_ir_status',
                        sortable: true,
                    },
                    'denormalization.requester.fullname': {
                        visible: true,
                        force: false,
                        title: 'l_ir_requester',
                        sortable: true,
                    },
                },
            },
        };
    },
    methods: {
        on_column_update(obj) {
            this.state.columns[obj.key].visible = obj.checked;
        },
        import_publications() {
            this.state.error = undefined;
            const content = this.fcontent(this.state.sinks.creations.import);
            if (!('filetype' in content)) {
                this.state.error = 'l_select_filetype_error';
                return;
            }

            if (!('url' in content)) {
                this.state.error = 'l_choose_file_error';
                return;
            }

            if (!('name' in content) || content.name.trim() === '') {
                this.state.error = 'l_choose_import_name_error';
                return;
            }

            this.$store.dispatch('create', {
                form: this.state.sinks.creations.system_report,
                path: APIRoutes.import(content.filetype),
                body: {
                    filepath: content.url,
                    name: content.name,
                },
            });
        },
        show_success(sink) {
            if (sink !== this.state.sinks.creations.system_report) {
                return;
            }

            this.state.in_progress = false;
            this.state.succeeded = true;
            setTimeout(() => {
                this.state.succeeded = false;
                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.sinks.creations.import,
                });
                this.$store.commit(Messages.INITIALIZE, {
                    form: this.state.sinks.creations.system_report,
                });
            }, 3000);
        },
        switch_to_loading(sink) {
            if (sink !== this.state.sinks.creations.system_report) {
                return;
            }
            this.state.in_progress = true;
        },
    },
    watch: {
        current_state(ns) {
            this.dispatch(ns, this, this.state.sinks.creations.system_report);
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
            return this.fstate(this.state.sinks.creations.system_report);
        },
    },
    mounted() {
    },
};
