const VueDropzone = require('vue2-dropzone');
const LangMixin = require('../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {

            },
            dropzone: {
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { 'My-Awesome-Header': 'header value' },
            },
        };
    },
    components: {
        'vue-dropzone': VueDropzone,
    },
};
