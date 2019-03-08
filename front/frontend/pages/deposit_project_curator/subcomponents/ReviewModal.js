const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const FiltersMixin = require('../../../../common/mixins/FiltersMixin');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin, FiltersMixin],
    props: {
        sink: { required: true, type: String },
        show: { required: true, type: Boolean },
        status: { required: true, type: Array },
    },
    methods: {
        toggle(v) {
            this.$emit('update:show', v);
        },
        review_project() {
            this.$emit('update:show', false);
            this.$emit('review-project');
        },
    },
    computed: {
        status_options() {
            return this.status;
        },
    },
};
