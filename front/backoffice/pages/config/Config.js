const Utils = require('../../utils/utils');
const APIRoutes = require('../../api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const Environments = require('../../lists/environments');
const Langs = require('../../lists/langs');

module.exports = {
    mixins: [ReaderMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('config', 'POST'),
                rpath: APIRoutes.entity('config', 'GET'),
                cform: 'config_creation',
                rform: 'config_read',
                itemsPerPage: 10,
                itemsPerRow: 2,
                langs: Langs.LangsList,
                environments: Environments,
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
