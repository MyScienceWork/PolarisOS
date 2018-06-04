module.exports = {
    props: {
        alphabet: { required: true, type: Array },
    },
    data() {
        return {
            state: {
                current: -1,
            },
        };
    },
    methods: {
        goto(idx, e) {
            this.state.current = idx;
            this.$emit('indexer-change', { id: idx, info: this.alphabet[idx] });
        },
    },
};
