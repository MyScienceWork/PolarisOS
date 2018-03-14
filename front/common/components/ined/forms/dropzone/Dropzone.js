const _ = require('lodash');
const VueDropzone = require('vue2-dropzone');
const APIRoutes = require('../../../../api/routes');
const LangMixin = require('../../../../mixins/LangMixin');
const Messages = require('../../../../api/messages');
const Handlebars = require('../../../../../../app/modules/utils/templating');

module.exports = {
    mixins: [LangMixin],
    components: {
        'vue-dropzone': VueDropzone,
    },
    props: {
        form: { required: true, type: String },
        master: { required: true, type: String },
        files: { required: true, type: String },
        name: { required: true, type: String },
        url: { required: true, type: String },
        readonly: { default: false, type: Boolean },
        keeper: { default: 'keeper_sink', type: String },
        keep_files: { default: false, type: Boolean },
        restore_files: { default: false, type: Boolean },
    },
    data() {
        return {
            dropzone: {
                url: APIRoutes.entity('', 'UPLOAD'),
                thumbnailWidth: 0,
                thumbnailHeight: 0,
                addRemoveLinks: false,
                maxFilesize: this.$store.state.global_config.upload.maxFileSizeInMB || 1.0,
                previewTemplate: '<div></div>',
                autoQueue: true,
                dictFileTooBig: '', // this.lang('l_dropzone_file_too_big'),
            },
            state: {
                files: { order: [], content: {} },
            },
        };
    },
    methods: {
        dropzone_added(file) {
            const name = `${file.name}_${file.lastModified}`;
            this.state.files.order.push(name);
            this.state.files.content[name] = file;
        },
        dropzone_complete(file) {
            const name = `${file.name}_${file.lastModified}`;
            this.state.files.content = Object.assign({},
                this.state.files.content, { [name]: file });
        },
        dropzone_error(file, message, xhr) {
            const name = `${file.name}_${file.lastModified}`;
            file.errorMessage = message;
            this.state.files.content = Object.assign({},
                this.state.files.content, { [name]: file });
        },
        dropzone_success(file, response) {
            const name = `${file.name}_${file.lastModified}`;
            file.pathOnServer = response.file;
            this.state.files.content = Object.assign({},
                this.state.files.content, { [name]: file });
        },
        dropzone_progress(file, progress, bytesSent) {
            const name = `${file.name}_${file.lastModified}`;
            this.state.files.content = Object.assign({},
                this.state.files.content, { [name]: file });
        },
        dropzone_remove(file, error, xhr) {
            const name = `${file.name}_${file.lastModified}`;
            // TODO remove file on server;
            const idx = _.findIndex(this.state.files.order, n => n === name);
            if (idx !== -1) {
                this.state.files.order.splice(idx, 1);
                delete this.state.files.content[name];
            }
        },
        removeFile(filename, e) {
            e.preventDefault();
            this.$refs.dropzone.removeFile(this.state.files.content[filename]);
            const idx = _.findIndex(this.state.files.order, n => n === name);
            if (idx !== -1) {
                this.state.files.order.splice(idx, 1);
                delete this.state.files.content[filename];
            }
        },
        analyze(filename) {
            this.$emit('analyze-file', filename);
        },
        filename_help(filename) {
            const file = this.state.files.content[filename];
            return Handlebars.compile(this.lang('l_dropzone_filename_help'))(file);
        },
    },
    mounted() {
        if (this.restore_files && Object.keys(this.keeperContent).length > 0) {
            this.state.files = this.keeperContent;
        }
    },
    beforeDestroy() {
        if (this.keep_files) {
            this.$store.commit(Messages.READ, {
                form: this.keeper,
                content: _.cloneDeep(this.state.files),
            });
        }
    },
    computed: {
        keeperContent() {
            if (this.keeper in this.$store.state.forms) {
                return this.$store.state.forms[this.keeper].content;
            }
            return {};
        },
    },
    watch: {
        keeperContent(kc) {
            this.state.files = kc;
        },
    },
};
