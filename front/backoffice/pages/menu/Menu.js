const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');


module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('menu', 'POST'),
                rpath: APIRoutes.entity('menu', 'GET'),
                itemsPerPage: 30,
                itemsPerRow: 1,
                forms: {
                    csink: 'menu_creation',
                    rsink: 'menu_read',
                },
            },
        };
    },
    methods: {
    },
    mounted() {
    },
    computed: {
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
    },
};
