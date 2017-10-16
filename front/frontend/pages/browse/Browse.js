module.exports = {
    data() {
        return {
            state: {
                value: 'No',
            },
        };
    },
    methods: {
        onKeyChange(val, e) {
            console.log('update with', val);
            e.preventDefault();
            this.state.value += val;
        },
    },
};
