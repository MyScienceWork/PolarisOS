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
                path: APIRoutes.entity('lang', 'POST'),
                rpath: APIRoutes.entity('lang', 'GET'),
                itemsPerPage: 1000,
                itemsPerRow: 1,
                langs: Langs.LangsList,
                quantities: Quantities,
                forms: {
                    csink: 'lang_creation',
                    rsink: 'lang_read',
                },
            },
        };
    },
    methods: {
        grab_quantity(arr, quantity) {
            const values = arr.filter(a => a.quantity === quantity);
            if (values.length === 0) {
                return '';
            }
            return values[0].value;
        },
    },
    mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.forms.rsink,
            path: this.state.rpath,
        });
    },
    computed: {
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
    },
};
