module.exports = {
    props: {
        hasOptions: { default: true },
        isRefreshable: { default: false },
        isRemovable: { default: false },
        isCollapsable: { default: true },
        collapsed: { default: false },
    },
    data() {
        return {
            state: {
                collapsed: false,
                show: true,
            },
        };
    },
    methods: {
        onCollapse(e) {
            e.preventDefault();
            this.state.collapsed = !this.state.collapsed;
            this.$emit('update:collapsed', !this.state.collapsed);
        },

        onRefresh(e) {
            e.preventDefault();
            this.$emit('refresh');
        },

        onRemove(e) {
            e.preventDefault();
            this.state.show = false;
            this.$emit('remove');
        },
    },
    mounted() {
        this.state.collapsed = this.collapsed;
    },
};
