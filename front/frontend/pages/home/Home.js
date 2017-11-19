const VSelect = require('vue-select').VueSelect;

module.exports = {
    data() {
        return {
            state: {
                value: 'No',
            },
        };
    },
    components: {
        'v-select': VSelect,
    },
    methods: {
        onKeyChange(val, e) {
            console.log('update with', val);
            e.preventDefault();
            this.state.value += val;
        },
    },
};
