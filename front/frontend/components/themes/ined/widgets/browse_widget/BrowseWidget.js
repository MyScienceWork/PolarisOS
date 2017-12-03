const VSelect = require('vue-select').VueSelect;
const WidgetMixin = require('../../../../../../common/mixins/WidgetMixin');

module.exports = {
    mixins: [WidgetMixin],
    props: {
        boxed: { type: Boolean, default: false },
        title: { type: String, default: '' },
        extraClasses: { default: '', type: String },
    },
    components: {
        'v-select': VSelect,
    },
    data() {
        return {
            state: {
                selected: undefined,
                selected_indexer: undefined,
                navigation: [
                    {
                        type: 'authors',
                        text: 'f_browse_by_author',
                        indexer: 'alpha',
                        select: true,
                        template: 'author-template',
                        item_per_row: 3,
                    },
                    {
                        type: 'years',
                        text: 'f_browse_by_year',
                        indexer: undefined,
                        select: true,
                        template: undefined,
                    },
                    {
                        type: 'type',
                        text: 'f_browse_by_type',
                        indexer: undefined,
                        select: true,
                        template: undefined,
                    },
                ],
            },
        };
    },
    methods: {
        onChange(val) {
            this.state.selected = val;
            this.$emit('select-change', val);
        },
        onIndexerChange(val) {
            this.state.selected_indexer = val.info;
        },
    },
    computed: {
        current_nav() {
            const query = this.$route.query;

            return query.i != null && query.i >= 0 ? this.state.navigation[query.i] : {};
        },
        indexer_options() {
            return {};
        },
        select_options() {
            return [];
        },
    },
};
