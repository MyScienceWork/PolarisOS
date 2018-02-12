const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');
const LangMixin = require('../../../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin, WidgetMixin],
    props: {
        extraClasses: { required: false, default: '', type: String },
        infos: { required: true, default: () => [], type: Array },
    },
    computed: {
        stats() {

        },
    },
};
