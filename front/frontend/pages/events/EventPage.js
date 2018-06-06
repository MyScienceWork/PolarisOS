const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
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
                        event: APIRoutes.entity('event', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        news: 'news_read',
                    },
                },
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.state.requests = ['event'].map(e => ({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 1,
                    where: {
                        _id: this.$route.params.id,
                    },
                },
            },
        }));
    },
    computed: {
        message() {
            const content = this.mcontent(this.state.sinks.reads.event);
            if (content.length > 0) {
                return content[0];
            }
            return {};
        },
    },
};
