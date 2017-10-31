const Utils = require('../../utils/utils');
const APIRoutes = require('../../api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../mixins/LangMixin');
const Langs = require('../../lists/langs');
const Quantities = require('../../lists/quantities');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('lang', 'POST'),
                rpath: APIRoutes.entity('lang', 'GET'),
                cform: 'lang_creation',
                rform: 'lang_read',
                itemsPerPage: 50,
                itemsPerRow: 3,
                langs: Langs.LangsList,
                quantities: Quantities,
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.rform,
            path: this.state.rpath,
        });
    },
    computed: {
        readContent() {
            if (this.state.rform in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform];
                return Utils.to_matrix(form.content instanceof Array ?
                        form.content : [], this.state.itemsPerRow);
            }
            return [];
        },
        contentLength() {
            if (this.state.rform in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform];
                return form.content.length;
            }
            return 0;
        },
    },
};
