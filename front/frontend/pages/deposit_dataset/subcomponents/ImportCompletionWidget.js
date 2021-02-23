const LangMixin = require('../../../../common/mixins/LangMixin');


module.exports = {
    mixins: [LangMixin],
    props: {
        sink: { required: true, type: String },
        importState: { required: true, type: String },
    },
    data() {
        return {
            state: {
            },
        };
    },
    methods: {
        import_from_id() {
            this.$emit('import-from-id');
        },
    },
};
