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
                const partitions = form.content.reduce((obj, info) => {
                    if (info.lang in obj) {
                        obj[info.lang].push(info);
                    } else {
                        obj[info.lang] = [info];
                    }
                    return obj;
                }, {});
                return Object.keys(partitions).reduce((obj, lang) => {
                    obj[lang] = Utils.to_matrix(partitions[lang], this.state.itemsPerRow);
                    return obj;
                }, {});
            }
            return [];
        },
    },
};
