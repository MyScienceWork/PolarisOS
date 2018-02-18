const Messages = require('../../../../common/api/messages');
const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        searchSink: { required: true, type: String },
        defaultSearch: { required: true, type: String },
        useFavorites: { default: true, type: Boolean },
        color: { default: 'purple' },
        placeholder: { default: 'f_search_in_archive', type: String },
    },
    data() {
        return {
            state: {
                showAdvanced: false,
            },
        };
    },
    methods: {
        search() {
            this.$store.commit(Messages.COLLECT, {
                form: this.searchSink,
            });
        },
    },
    computed: {
    },
};
