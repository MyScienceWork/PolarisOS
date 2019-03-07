const Messages = require('../../../../api/messages');
const APIRoutes = require('../../../../api/routes');
const Utils = require('../../../../utils/utils');

const FormMixin = require('../../../../mixins/FormMixin');
const LangMixin = require('../../../../mixins/LangMixin');
const PaginationSearchMixin = require('../../../../mixins/PaginationSearchMixin');

module.exports = {
    mixins: [LangMixin, FormMixin, PaginationSearchMixin],
    props: {
        sizeList: { default: () => [10, 30, 50, 100], type: Array },
        sortList: { required: false, type: Array, default: () => [] },
        filters: { required: false, type: Array, default: () => [] },
        matrixRowSize: { default: 1, type: Number },
        getAllResults: { default: false, type: Boolean },
        checkable: { default: false, type: Boolean },
        checkedRows: { default: () => [], type: Array },
        detailed: { default: false, type: Boolean },
        detailKey: { default: '', type: String },
        tableClasses: { default: '', type: String },
        columns: { default: () => ({}), type: Object },
        all_columns_visible: { default: true, type: Boolean },
        showSearch: { default: true, type: Boolean },
        enablePagination: { default: true, type: Boolean },
    },
    data() {
        return {
            state: {
                all_columns_visible: true,
            },
        };
    },
    methods: {
        search() {
            this.send_information(this.searchSink);
        },
        send_information(sink) {
            if (sink === this.searchSink) {
                this.run_search(sink);
            }
        },
        on_page_change(page) {
            this.currentPage = page;
        },
        on_checkbox_update(key, checked) {
            this.$emit('column-checkbox-update', { key, checked });
        },
        on_main_checkbox_update(columns, checked) {
            this.state.all_columns_visible = checked;
            Object.keys(columns).forEach((key) => {
                this.$emit('column-checkbox-update', { key, checked });
            });
        },
        on_checked_rows_update(checkedList, row) {
            this.$emit('table-checked-rows-update', { checkedRows: checkedList, checkedRow: row });
        },
    },
    watch: {
    },
    computed: {
        default_sort() {
            if (this.state.seso.sort && this.state.seso.order) {
                return [this.state.seso.sort, this.state.seso.order];
            }
            return [];
        },
        content() {
            const content = this.fcontent(this.resultSink);

            if (!(content instanceof Array)) {
                return [];
            }

            return content;
        },
        matrix_content() {
            return Utils.to_matrix(this.content, this.matrixRowSize);
        },
        total() {
            const form = this.fform(this.resultSink);
            return form.total || 0;
        },
    },
    mounted() {
    },
};
