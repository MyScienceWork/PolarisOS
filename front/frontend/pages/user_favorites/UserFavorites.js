const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {
                views: {},
            },
        };
    },
    methods: {
        toggle(index, e) {
            e.preventDefault();
            if (index in this.state.views) {
                delete this.state.views[index];
                this.state.views = Object.assign({}, this.state.views);
            } else {
                this.state.views = Object.assign({}, this.state.views, { [index]: 1 });
            }
        },
    },
};
