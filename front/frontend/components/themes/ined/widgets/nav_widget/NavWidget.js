const VSelect = require('vue-select').VueSelect;
const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    components: {
        'v-select': VSelect,
    },
    data() {
        return {
            state: {
                options: [],
                selected: undefined,
            },
        };
    },
    methods: {
        onChange(val) {
            this.state.selected = val;
            this.$emit('select-change', val);
        },
    },
};
