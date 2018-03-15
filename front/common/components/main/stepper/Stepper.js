const _ = require('lodash');

const LangMixin = require('../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        numberOfSteps: {
            type: Number,
            required: true,
        },
        checkIfCompleted: {
            default: true,
            type: Boolean,
        },
    },
    data() {
        return {
            state: {
                current_step: 0,
                colors: ['red', 'orange', 'purple', 'brown', 'green', 'blue'],
            },
        };
    },
    methods: {
        next(e) {
            this.go(this.state.current_step + 1, e);
        },
        previous(e) {
            this.go(this.state.current_step - 1, e);
        },
        go(step, e, emit = true) {
            e.preventDefault();
            this.state.current_step = _.clamp(step, 0, this.numberOfSteps);
            if (emit) {
                this.$emit('step-change', { e, step: this.state.current_step });
            }
        },
    },
    mounted() {
        this.go(this.state.current_step, { preventDefault() {} }, false);
    },
};
