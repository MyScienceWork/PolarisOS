
module.exports = {
    props: {
        color: { required: true, type: String },
    },
    methods: {
        hasSlot(name = 'default') {
            return !!this.$slots[name] || !!this.$scopedSlots[name];
        },
    },
};
