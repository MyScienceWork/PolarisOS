const LangMixin = require('../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        twoSteps: { default: false, type: Boolean },
        confirmation: { default: 'Are you sure?', type: String },
        tag: { default: 'button', type: String },
    },
    data() {
        return {
            state: {
                confirm: false,
            },
        };
    },
    methods: {
        click(e) {
            e.preventDefault();
            if (this.twoSteps && !this.state.confirm) {
                this.state.confirm = true;
                setTimeout(() => { this.state.confirm = false; }, 3000);
            } else {
                this.state.confirm = false;
                this.$emit('action-click');
            }
        },
    },
};
