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
                forms: {
                    rsink: 'publication_read',
                },
                itemsPerPage: 200,
                itemsPerRow: 1,
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.forms.rsink,
            path: this.state.rpath,
            body: {
                size: 200,
                population: ['authors._id'],
            },
        });
    },
    computed: {
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
    },
};
