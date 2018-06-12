const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const moment = require('moment');

module.exports = {
    mixins: [LangMixin, ReaderMixin, UserMixin, FiltersMixin],
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
                    size: 1,
                    population: ['author'],
                    where: {
                        _id: this.$route.params.id,
                    },
                },
            },
        }));
    },
    watch: {

    },
    computed: {
        message() {
            const content = this.mcontent(this.state.sinks.reads.news);
            if (content.length > 0) {
                return content[0];
            }
            return {};
        },
    },
};
