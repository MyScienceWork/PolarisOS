const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    props: {
        info: { type: Object, default: () => ({}) },
    },
    data() {
        return {
            state: {
            },
        };
    },
};
