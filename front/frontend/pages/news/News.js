const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');

module.exports = {
    mixins: [LangMixin, ReaderMixin, FiltersMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        news: APIRoutes.entity('news', 'POST', true),
                    },
                    creations: {
                    },
                },
                sinks: {
                    reads: {
                        news: 'news_read',
                    },
                    creations: {
                    },
                },
            },
        };
    },
    components: {
    },
    mounted() {
        this.$store.state.requests = ['news'].map(e => ({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 20,
                    population: ['author'],
                    where: {},
                },
            },
        }));
    },
    computed: {
        news() {
            return this.mcontent(this.state.sinks.reads.news);
        },
    },
};
