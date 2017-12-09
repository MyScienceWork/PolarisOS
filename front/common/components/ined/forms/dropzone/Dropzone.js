const VueDropzone = require('vue2-dropzone');
const APIRoutes = require('../../../../api/routes');
const LangMixin = require('../../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    components: {
        'vue-dropzone': VueDropzone,
    },
    props: {
    },
    data() {
        return {
            dropzone: {
                url: APIRoutes.entity('', 'UPLOAD'),
                thumbnailWidth: 0,
                thumbnailHeight: 0,
                addRemoveLinks: this.$store.state.global_config.upload.allowRemoveFiles || false,
                maxFilesize: this.$store.state.global_config.upload.maxFileSizeInMB || 1.0,
                previewTemplate: () => '',
            },
        };
    },
    methods: {
    },

    computed: {
    },

    watch: {
    },
};
