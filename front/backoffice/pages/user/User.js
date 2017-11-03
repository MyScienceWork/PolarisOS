const Utils = require('../../utils/utils');
const APIRoutes = require('../../api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('user', 'POST'),
                rpath: APIRoutes.entity('user', 'GET'),
                cform: 'user_creation',
                rform: 'user_read',
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
        this.$store.dispatch('search', {
            form: 'form_read',
            path: APIRoutes.entity('form', 'POST', true),
            body: {
                size: 10,
                where: {
                    $and: [{ name: 'user_form' }],
                },
            },
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
        form() {
            if ('form_read' in this.$store.state.forms) {
                const form = this.$store.state.forms.form_read;
                return form.content[0] || null;
            }
            return null;
        },
    },
};
