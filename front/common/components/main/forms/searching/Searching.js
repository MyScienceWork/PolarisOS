const Messages = require('../../../../api/messages');
const APIRoutes = require('../../../../api/routes');
const Utils = require('../../../../utils/utils');

const FormMixin = require('../../../../mixins/FormMixin');
const LangMixin = require('../../../../mixins/LangMixin');
const PaginationSearchMixin = require('../../../../mixins/PaginationSearchMixin');

module.exports = {
    mixins: [LangMixin, FormMixin, PaginationSearchMixin],
    props: {
        autoSearch: { default: true, type: Boolean },
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
        readOnly: { default: false, type: Boolean },
        name: { default: '', type: String },
    },
    data() {
        return {
            state: {
                all_columns_visible: true,
                checked_list: [],
                row: {},
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
            this.$emit('column-checkbox-update', { name: this.name, key, checked });
        },
        on_main_checkbox_update(columns, checked) {
            this.state.all_columns_visible = checked;
            Object.keys(columns).forEach((key) => {
                this.$emit('column-checkbox-update', { name: this.name, key, checked });
            });
        },
        on_checked_rows_update(checked_list, row) {
            this.state.checked_list = checked_list;
            this.state.row = row;
            this.$emit('table-checked-rows-update', { name: this.name, checkedRows: checked_list, checkedRow: row });
        },
    },
    watch: {
        on_checked_rows_update(checked_list, row) {
            this.state.checked_list = checked_list;
            this.state.row = row;
            this.$emit('table-checked-rows-update', { name: this.name, checkedRows: checked_list, checkedRow: row });
        },
        current_state_search(s) {
            if (s === 'error_validate') {
                // restore checked rows
                this.$emit('table-checked-rows-update', { name: this.name, checkedRows: this.state.checked_list, checkedRow: this.state.row });
            }
        },
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

            this.$emit('update-data-from-api', { name: this.name, data: content });

            return content;
        },
        matrix_content() {
            return Utils.to_matrix(this.content, this.matrixRowSize);
        },
        total() {
            const form = this.fform(this.resultSink);
            return form.total || 0;
        },
        current_state_search() {
            return this.fstate(this.searchSink);
        },
    },
    mounted() {
        if (this.autoSearch) {
            this.search();
        }
    }
};
