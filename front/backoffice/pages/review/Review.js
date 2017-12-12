const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                rpath: APIRoutes.entity('publication', 'POST', true),
                rform: 'publication_read',
                itemsPerPage: 200,
                itemsPerRow: 1,
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.rform,
            path: this.state.rpath,
            body: {
                size: 200,
                population: ['authors._id'],
            },
        });
    },
    computed: {
        content() {
            if (this.state.rform in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform];
                const content = form.content || [];
                return content;
            }
            return [];
        },
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
    },
};
