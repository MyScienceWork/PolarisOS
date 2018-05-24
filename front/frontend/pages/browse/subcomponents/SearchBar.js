const Messages = require('../../../../common/api/messages');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

const AdvancedSearchSpecs = require('../../../../common/specs/AdvancedSearchSpecs');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        searchSink: { required: true, type: String },
        defaultSearch: { required: true, type: String },
        useFavorites: { default: false, type: Boolean },
        color: { default: 'purple' },
        placeholder: { default: 'f_search_in_archive', type: String },
        showAdvancedSearch: { default: false, type: Boolean },
    },
    data() {
        return {
            state: {
            },
        };
    },
    methods: {
        search() {
            this.$store.commit(Messages.FORCE_COMPLETION, {
                form: this.searchSink,
            });
        },
        show_advanced_search() {
            this.$emit('update:showAdvancedSearch', !this.showAdvancedSearch);
        },
    },
    computed: {
        specs() {
            return AdvancedSearchSpecs;
        },
    },
};
