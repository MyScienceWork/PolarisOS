const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const Langs = require('../../lists/langs');
const Quantities = require('../../lists/quantities');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                need_html_editor: false,
                path: APIRoutes.entity('lang', 'POST'),
                rpath: APIRoutes.entity('lang', 'POST', true),
                langs: Langs.LangsList,
                quantities: Quantities,
                forms: {
                    csink: 'lang_creation',
                    rsink: 'lang_read',
                },
                sinks: {
                    creations: {
                        search: 'search_creation_lang',
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
