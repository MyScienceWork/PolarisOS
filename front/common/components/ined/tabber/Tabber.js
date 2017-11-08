
module.exports = {
    props: {
        tabs: { required: true, type: Array },
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
