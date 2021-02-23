const APIRoutes = require('../../../../../common/api/routes');
const LangMixin = require('../../../../../common/mixins/LangMixin');
const ESQueryMixin = require('../../../../../common/mixins/ESQueryMixin');
const ObjectAccessMixin = require('../../../../../common/mixins/ObjectAccessMixin');
const FiltersMixin = require('../../../../../common/mixins/FiltersMixin');
const ReaderMixin = require('../../../../../common/mixins/ReaderMixin');

module.exports = {
    mixins: [LangMixin, APIRoutes, ESQueryMixin, ObjectAccessMixin, FiltersMixin, ReaderMixin],
    props: {
        form: { required: true, type: String },
        importer: { required: true, type: String },
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        search: 'search_creation',
                        system_report: 'report_creation',
                    },
                    reads: {
                        importer: 'importer_read',
                        system_report: 'report_read',
                    },
                },
                paths: {
                    reads: {
                        importer: APIRoutes.entity('importer', 'POST', true),
                        system_report: APIRoutes.entity('system_report', 'POST', true),
                    },
                },
                inputs: {},
                error: undefined,
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
            const importer = this.fcontent(this.state.sinks.reads.importer);
            if (!(importer instanceof Array)) {
                this.state.error = 'l_import_error';
                return;
            }
            const content = this.fcontent(this.form);

            console.log('content : ', content);
            console.log('content.files : ', content.files[0]);
            console.log('importer : ', importer);

            if (!content.files || !(content.files[0])) {
                this.state.error = 'l_content_error';
                return;
            }
            const file = content.files[0];
            const file_format = importer[0].file_format;
            const entity = importer[0].entity;

            if (file_format === '') {
                this.state.error = 'l_select_filetype_error';
                return;
            }

            if (!('url' in file)) {
                this.state.error = 'l_choose_file_error';
                return;
            }

            if (!('filepath' in file) || file.filepath.trim() === '') {
                this.state.error = 'l_choose_import_name_error';
                return;
            }

            this.$store.dispatch('create', {
                form: this.state.sinks.creations.system_report,
                path: APIRoutes.import(file_format),
                body: {
                    filepath: content.url,
                    name: content.name,
                    entity,
                },
            });
        },
    },
    watch: {
    },
    computed: {
    },
    beforeMount() {
        this.$store.dispatch('search', {
            path: this.state.paths.reads.importer,
            form: this.state.sinks.reads.importer,
            body: {
                where: {
                    _id: this.importer,
                },
            },
        });
    },
};
