const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    props: {
        extraClasses: { required: false, default: [] },
        title: { required: true, type: String },
        content: { required: true, type: String },
    },
};
