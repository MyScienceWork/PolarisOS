const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    methods: {
        trigger_click(e) {
            e.preventDefault();
            console.log(e);
        },
    },
};
