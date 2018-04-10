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
        next() {
            this.go(this.state.current_step + 1);
        },
        previous() {
            this.go(this.state.current_step - 1);
        },
        go(step, emit = true) {
            this.state.current_step = _.clamp(step, 0, this.numberOfSteps);
            if (emit) {
                this.$emit('step-change', { step: this.state.current_step });
            }
        },
    },
    mounted() {
        this.go(this.state.current_step, { preventDefault() {} }, false);
    },
};
