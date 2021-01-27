const moment = require('moment');

const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const FiltersMixin = require('../../../../common/mixins/FiltersMixin');
const Handlebars = require('../../../../../app/modules/utils/templating');

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
        review_publication() {
            this.$emit('update:show', false);
            this.$emit('review-publication');
        },
    },
    computed: {
        status_options() {
            return this.status;
        },
        index_comment() {
            const content = this.fcontent(this.sink);
            if (content.history) {
                return `${Object.keys(content.history).length}`;
            }
            return 0;
        },
        new_state() {
            const content = this.fcontent(this.sink);
            return content.state;
        },
        updated_date() {
            return Handlebars.compile('{{moment unix=true}}')({});
        },
    },
};
