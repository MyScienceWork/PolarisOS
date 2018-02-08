const LangMixin = require('../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        items: { required: true, type: Array },
    },
};
