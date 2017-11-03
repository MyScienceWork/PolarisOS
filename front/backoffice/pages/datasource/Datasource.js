const Utils = require('../../utils/utils');
const APIRoutes = require('../../api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('datatemplate', 'POST'),
                rpath: APIRoutes.entity('datatemplate', 'GET'),
                cform: 'datatemplate_creation',
                rform: 'datatemplate_read',
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
                projection: ['label', 'name'],
                size: 10000,
            },
        });
    },
    computed: {
        content() {
            if (this.state.rform in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform];
                const content = form.content || [];
                return content.map((c) => {
                    c.label = this.lang(c.label);
                    return c;
                });
            }
            return [];
        },
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        forms() {
            if ('form_read' in this.$store.state.forms) {
                return this.$store.state.forms.form_read.content.map((c) => {
                    c.label = this.lang(c.label);
                    return c;
                });
            }
            return [];
        },
    },
};
