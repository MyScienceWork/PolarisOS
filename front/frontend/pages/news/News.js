const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const moment = require('moment');

module.exports = {
    mixins: [LangMixin, ReaderMixin],
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
    methods: {
        date_format(date) {
            return moment(date).fromNow();
        },
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
                    population: ['auhtor'],
                    where: {},
                },
            },
        }));
    },
    computed: {
        news() {
            const content = this.mcontent(this.state.sinks.reads.news);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
    },
};
