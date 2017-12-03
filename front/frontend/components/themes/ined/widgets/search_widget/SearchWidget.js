const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    props: {
        small: { default: false, type: Boolean },
    },
    data() {
        return {
            state: {
                more_options: false,
            },
        };
    },
    methods: {
        trigger_click(e) {
            e.preventDefault();
            console.log(e);
        },
    },
};
