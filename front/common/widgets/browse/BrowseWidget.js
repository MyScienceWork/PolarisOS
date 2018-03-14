const _ = require('lodash');
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
                selected: [],
                selected_indexer: undefined,
                navigation: [
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
            const a = this.authors.reduce((obj, a) => {
                obj[a.prefix] = obj[a.prefix] || [];
                obj[a.prefix].push(a);
                return obj;
            }, {});
            return a;
        },
        select_options() {
            switch (this.current_nav.type) {
            case 'authors': {
                this.authors.sort((a, b) => (a.lastname < b.lastname ? -1 : (a.lastname > b.lastname ? 1 : 0)));
                const authors = this.authors.map(a => ({ label: a.fullname, value: a._id }));
                return authors;
            }
            case 'years':
                return _.range(1900, 2018).map(y => ({ value: `${y}`, label: `${y}` }));
            case 'types':
                return [{ value: 'test', label: 'Test' }];
            default:
                return [];
            }
        },
        search() {
            if ('type' in this.current_nav) {
                return this.state.selected.map(
                    o => `${this.current_nav.type}=${encodeURIComponent(o.value)}`).join('&');
            }
            return '';
        },
        authors() {
            return [];
        },
    },
};
