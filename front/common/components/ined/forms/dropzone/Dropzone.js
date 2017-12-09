const _ = require('lodash');
const VueDropzone = require('vue2-dropzone');
const APIRoutes = require('../../../../api/routes');
const LangMixin = require('../../../../mixins/LangMixin');

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
            this.state.files.content = Object.assign({}, this.state.files.content, { [name]: file });
        },
        dropzone_error(file, message, xhr) {
            file.errorMessage = message;
            this.state.files.content = Object.assign({}, this.state.files.content, { [name]: file });
        },
        dropzone_success(file, response) {
        },
        dropzone_progress(file, progress, bytesSent) {
            this.state.files.content = Object.assign({}, this.state.files.content, { [name]: file });
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
        },
    },

    computed: {
    },

    watch: {
    },
};
