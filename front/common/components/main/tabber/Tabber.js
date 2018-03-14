
module.exports = {
    props: {
        tabs: { required: true, type: Array },
        variadic: { default: false, type: Boolean },
    },
    data() {
        return {
            state: {
                current: 0,
            },
        };
    },
    methods: {
        go(idx, e) {
            e.preventDefault();
            this.state.current = idx;
        },
    },
};
