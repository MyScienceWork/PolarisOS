const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
// const FormMixin = require('../../../common/mixins/FormMixin');
// const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
// const PaginationSearchMixin = require('../../../common/mixins/PaginationSearchMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const Handlebars = require('../../../../app/modules/utils/templating');
const moment = require('moment');

module.exports = {
    mixins: [LangMixin, ReaderMixin],
    data() {
        return {
            state: {
                isActive: true,
                es_query_id_incoming_events: 'front-incoming-event-query',
                es_query_id_past_events: 'front-past-event-query',
                paths: {
                    reads: {
                        get_incoming_events: APIRoutes.entity('events', 'POST', true),
                        get_past_events: APIRoutes.entity('events', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        get_incoming_events: 'incoming_events_read',
                        get_past_events: 'past_events_read',
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
    watch: {
        es_query_id_incoming_events(q) {
            if (q && q.trim() !== '') {
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads.get_incoming_events,
                    path: this.state.paths.reads.get_incoming_events,
                    body: {
                        where: {
                            id: this.state.es_query_id_incoming_events,
                        },
                    },
                });
            }
        },
        es_query_id_past_events(q) {
            if (q && q.trim() !== '') {
                this.$store.dispatch('search', {
                    form: this.state.sinkks.reads.get_past_events,
                    path: this.state.paths.reads.get_path_events,
                    body: {
                        where: {
                            id: this.state.es_query_id_past_events,
                        },
                    },
                });
            }
        },
        // es_query_content(new_content) {
        //     if (new_content) {
        //         this.$store.dispatch('search', {
        //             form: this.state.sinks.reads.get_events,
        //             path: this.state.paths.reads.get_events,
        //             body: {
        //                 where: JSON.parse(Handlebars.compile(new_content)({search:
        //                 "startDate": }))
        //             },
        //         });
        //     }
        // },
    },
    mounted() {
        this.$store.state.requests = ['events'].map(e => ({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 50,
                },
            },
        }));
    },
    computed: {
        incoming_events() {
            const content = this.mcontent(this.state.sinks.reads.get_incoming_events);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
        past_events() {
            const content = this.mcontent(this.state.sinks.reads.get_past_events);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
    },
};
