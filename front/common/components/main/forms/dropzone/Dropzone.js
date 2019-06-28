const _ = require('lodash');
const VueDropzone = require('vue2-dropzone');
const APIRoutes = require('../../../../api/routes');
const LangMixin = require('../../../../mixins/LangMixin');
const FormMixin = require('../../../../mixins/FormMixin');
const Messages = require('../../../../api/messages');
const Utils = require('../../../../utils/utils');
const Handlebars = require('../../../../../../app/modules/utils/templating');

module.exports = {
    mixins: [LangMixin, FormMixin],
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
                timeout: 3600000,
            },
            state: {
                files: { order: [], content: {} },
                master_files: {},

            },
        };
    },
    methods: {
        update_master_files(i, val) {
            if (!val && i in this.state.master_files) {
                delete this.state.master_files[i];
                this.state.master_files = Object.assign({}, this.state.master_files);
                return;
            }

            if (val) {
                this.state.master_files = Object.assign({}, this.state.master_files, { [i]: val });
            }
        },
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
            file.previewUrl = response.preview;
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
            const idx = _.findIndex(this.state.files.order, n => n === filename);
            if (idx !== -1) {
                this.state.files.order.splice(idx, 1);
                delete this.state.files.content[filename];
                this.$store.commit(Messages.REMOVE_FORM_ELEMENT, {
                    form: this.form,
                    name: `${this.files}.${idx}`,
                });

                this.$store.commit(Messages.UNREGISTER_FORM_ELEMENT, {
                    form: this.form,
                    name: `${this.files}.${idx}`,
                    pattern: true,
                });
            }
        },
        analyze(filename) {
            this.$emit('analyze-file', filename);
        },
        filename_help(filename) {
            const file = this.state.files.content[filename];
            return Handlebars.compile(this.lang('l_dropzone_filename_help'))(file);
        },
        initialize(s) {
            if (s !== this.form) {
                return;
            }

            if (this.state.files.order.length > 0) {
                return;
            }

            const content = this.fcontent(s);
            if (!content || Object.keys(content).length === 0) {
                return;
            }

            const files = Utils.find_value_with_path(content, this.files.split('.'));
            if (!files) {
                return;
            }

            this.state.files.order = files.map(f => f[this.name]);
            this.state.files.content = files.reduce((obj, f) => {
                obj[f[this.name]] = { name: f[this.name],
                    [this.master]: f[this.master],
                    upload: { progress: 100 },
                    status: 'success',
                    pathOnServer: f.url || '',
                    size: parseFloat(f.size || 0.0) * 1024 };
                return obj;
            }, {});
        },
    },
    mounted() {
        if (this.restore_files && Object.keys(this.keeperContent).length > 0) {
            this.state.files = this.keeperContent;
        }

        this.initialize(this.form);
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
        dropzoneData() {
            this.dropzone.dictFileTooBig = this.lang('l_dropzone_file_too_big');
            return this.dropzone;
        },
    },
    watch: {
        keeperContent(kc) {
            if (this.restore_files && Object.keys(this.keeperContent).length > 0) {
                this.state.files = kc;
            }
        },
    },
};
