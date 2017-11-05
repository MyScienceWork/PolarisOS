const Utils = require('../../utils/utils');
const APIRoutes = require('../../api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../mixins/LangMixin');
const FormMixin = require('../mixins/FormMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity(this.$route.params.datainstance, 'POST'),
                rpath: APIRoutes.entity(this.$route.params.datainstance, 'GET'),
                cform: `${this.$route.params.datainstance}_creation`,
                rform: `${this.$route.params.datainstance}_read`,
                itemsPerPage: 20,
                itemsPerRow: 2,
                forms: {
                    name: `${this.$route.params.datainstance}_form`,
                    group: 'typology',
                },
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
    },
};
