const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const moment = require('moment');

module.exports = {
    mixins: [LangMixin, ReaderMixin, FiltersMixin, UserMixin],
    data() {
        return {
            state: {
                isAdministrator: false,
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
        if (this.roles.administrator && this.roles.administrator.id === 'administrator') {
            this.state.isAdministrator = true;
        }

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
