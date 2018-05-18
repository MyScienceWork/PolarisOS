const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');

module.exports = {
    mixins: [LangMixin],
    components: {
    },
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        forum: APIRoutes.entity('forum_discussion', 'POST', true),
                        discipline: APIRoutes.entity('discipline', 'POST', true),
                    },
                    creations: {
                        forum: APIRoutes.entity('forum_discussion', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        forum: 'forum_read',
                    },
                    creations: {
                        forum: 'forum_creation',
                    },
                },
            },
        };
    },
    methods: {

    },
    mounted() {

    },
    computed: {

    },
};
