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
        defaultSort: { default: () => [], type: Array },
    },
    data() {
        return {
            state: {
                loading: false,
            },
        };
    },
    methods: {
        search() {
            this.$store.commit(Messages.COLLECT, {
                form: this.searchSink,
            });
        },
        send_information(sink) {
            if (sink === this.searchSink) {
                this.state.loading = true;
                this.run_search(sink);
            }
        },
        on_page_change(page) {
            this.currentPage = page;
        },
        show_success_read(sink) {
            if (sink === this.searchSink) {
                this.state.loading = false;
            }
        },
    },
    watch: {
    },
    computed: {
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
