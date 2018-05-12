const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const FiltersMixin = require('../../../../common/mixins/FiltersMixin');


module.exports = {
    mixins: [LangMixin, FormMixin, FiltersMixin],
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
