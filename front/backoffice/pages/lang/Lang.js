const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const Langs = require('../../lists/langs');
const Quantities = require('../../lists/quantities');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FiltersMixin, FormCleanerMixin],
    data() {
        return {
            state: {
                need_html_editor: false,
                langs: Langs.LangsList,
                quantities: Quantities,
                sinks: {
                    creations: {
                        search: 'search_creation_lang',
                        lang: 'lang_creation',
                    },
                    reads: {
                        lang: 'lang_read',
                    },
                },
                paths: {
                    creations: {
                        lang: APIRoutes.entity('lang', 'POST'),
                    },
                    reads: {
                        lang: APIRoutes.entity('lang', 'POST', true),
                    },
                },
            },
        };
    },
    methods: {
        grab_quantity(arr, quantity) {
            if (!arr) {
                return '';
            }

            const values = arr.filter(a => a.quantity === quantity);
            if (values.length === 0) {
                return '';
            }
            return values[0].value;
        },
    },
    mounted() {
    },
    computed: {
        search_query() {
            return JSON.stringify({
                $or: [
                    { key: '{{search}}' },
                    { 'values.value': '{{search}}' },
                    { 'parts.value': '{{search}}' },
                    { lang: '{{search}}' },
                ],
            });
        },
    },
};
