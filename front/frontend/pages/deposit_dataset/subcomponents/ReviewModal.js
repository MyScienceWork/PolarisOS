const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const FiltersMixin = require('../../../../common/mixins/FiltersMixin');

const ReviewStatusesSpecs = require('../../../../common/specs/review_statuses');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin, FiltersMixin],
    props: {
        sink: { required: true, type: String },
        show: { required: true, type: Boolean },
    },
    data() {
        return {
            state: {
                show_review_modal: false,
                status_review: undefined,
            },
        };
    },
    methods: {
        status_review_change(val) {
            this.state.status_review = val ? val.value : undefined;
        },
        toggle(v) {
            this.$emit('update:show', v);
        },
        review_dataset() {
            this.$emit('update:show', false);
            this.$emit('review-dataset');
        },
    },
    computed: {
        status_options() {
            return ReviewStatusesSpecs;
        },
    },
};
