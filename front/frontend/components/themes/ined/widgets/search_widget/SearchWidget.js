const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    props: {
        mode: { default: 'all', type: String },
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
