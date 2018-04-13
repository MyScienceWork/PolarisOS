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
