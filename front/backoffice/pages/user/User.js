const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('user', 'POST'),
                rpath: APIRoutes.entity('user', 'GET'),
                cform: 'user_creation',
                rform: 'user_read',
                forms: {
                    name: 'form_read',
                    group: 'user',
                },
                itemsPerPage: 20,
                itemsPerRow: 2,
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
