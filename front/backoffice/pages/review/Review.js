const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const BrowserUtils = require('../../../common/utils/browser');
const moment = require('moment');
const _ = require('lodash');
const Queries = require('../../../common/specs/queries');
const SortLists = require('../../../common/specs/sorts');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                itemsPerPage: 1000,
                itemsPerRow: 1,
                paths: {
                    reads: {
                        publication: APIRoutes.entity('publication', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        publication: 'publication_read',
                    },
                    creations: {
                        search: 'search_creation_publication',
                    },
                },
                columns: {
                    _id: {
                        visible: true,
                        force: true,
                        title: 'l_id',
                    },
                    'denormalization.authors._id.fullname': {
                        visible: true,
                        force: false,
                        title: 'l_p_author',
                        lang: 'other',
                    },
                    'title.content': {
                        visible: true,
                        force: false,
                        title: 'l_p_title',
                    },
                    'dates.publication': {
                        visible: true,
                        force: false,
                        title: 'l_p_year',
                    },
                    status: {
                        visible: true,
                        force: false,
                        title: 'l_p_status',
                    },
                    'dates.update': {
                        visible: true,
                        force: false,
                        title: 'l_p_update',
                    },
                    files: {
                        visible: true,
                        force: false,
                        title: 'l_p_file',
                        lang: 'other',
                    },
                    'denormalization.depositor.lastname.raw': {
                        visible: true,
                        force: false,
                        title: 'l_p_depositor',
                    },
                    depositor: {
                        visible: true,
                        force: true,
                        title: 'l_p_action',
                        lang: 'other',
                    },
                    'denormalization.reviewer.lastname.raw': {
                        visible: true,
                        force: false,
                        title: 'l_p_reviewer',
                    },
                },
            },
        };
    },
    methods: {
        get_info(content, path) {
            const val = Utils.find_value_with_path(content, path.split('.'));
            if (val) {
                return val;
            }
            return '';
        },
        on_column_update(obj) {
            this.state.columns[obj.key].visible = obj.checked;
        },
        get_multi_download_link(item) {
            if (item.files.length === 0) {
                return null;
            }

            const names = item.files.reduce((arr, f) => {
                arr.push(f.name);
                return arr;
            }, []);

            const filenames = item.files.reduce((arr, f) => {
                arr.push(f.url);
                return arr;
            }, []);

            return APIRoutes.multi_download('publication', item._id, names, filenames);
        },
    },
    filters: {
        truncate(value, length, separator = ' ') {
            return _.truncate(value, {
                length,
                separator,
            });
        },
        join(value, subpath, sep = ', ') {
            return value.map(v => Utils.find_value_with_path(v, subpath.split('.'))).filter(v => v != null).join(sep);
        },
        format_date(d, f = 'LLLL') {
            return moment(d).format(f);
        },
    },
    mounted() {
    },
    watch: {
    },
    computed: {
        host() {
            return BrowserUtils.getURLHost(window.location);
        },
        search_query() {
            return JSON.stringify(Queries.publication_search);
        },
        sort_list() {
            return SortLists.publication_validation_sorts;
        },
    },
};
