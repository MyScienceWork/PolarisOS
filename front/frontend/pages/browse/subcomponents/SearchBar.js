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
        show_advanced_search: { default: false, type: Boolean },
    },
    data() {
        return {
            state: {
                // showAdvanced: false,
            },
        };
    },
    // watch: {
    //     as(value) {
    //         if (value === 'advanced_search') {
    //             this.state.showAdvanced = true;
    //         }
    //     },
    // },
    methods: {
        search() {
            this.$store.commit(Messages.FORCE_COMPLETION, {
                form: this.searchSink,
            });
        },
        showAdvancedSearch() {
            this.$emit('update:show_advanced_search', !this.show_advanced_search);
        },
    },
    computed: {
        specs() {
            return AdvancedSearchSpecs;
        },
    },
};
