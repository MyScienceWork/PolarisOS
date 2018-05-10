const LangMixin = require('../../../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        extraClasses: { required: false, default: '', type: String },
        items: { required: true, default: () => [], type: Array },
    },
    computed: {
    },
};
