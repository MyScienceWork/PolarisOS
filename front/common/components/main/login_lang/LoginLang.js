const UserMixin = require('../../../../common/mixins/UserMixin');
const LangMixin = require('../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin, UserMixin],
    props: {
        languages: { type: Array, default: () => [] },
        backToWebsite: { type: Boolean, default: false },
        backoffice: { type: Boolean, default: false },
        website: { type: String, default: '' },
    },
    methods: {
        need_help() {
            this.$intro().start();
        },
    },
};
