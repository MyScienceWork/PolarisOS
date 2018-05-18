const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
// const FormMixin = require('../../../common/mixins/FormMixin');
// const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
// const PaginationSearchMixin = require('../../../common/mixins/PaginationSearchMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const Handlebars = require('../../../../app/modules/utils/templating');

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
                        incoming_event: APIRoutes.entity('event', 'POST', true),
                        past_event: APIRoutes.entity('event', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        incoming_event: 'incoming_events_read',
                        past_event: 'past_events_read',
                    },
                },
            },
        };
    },
    components: {
    },
    methods: {
    },
    watch: {
        es_query_contents(new_content) {
            if (this.state.es_query_id_incoming_events in new_content) {
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads.incoming_event,
                    path: this.state.paths.reads.incoming_event,
                    body: {
                        where: JSON.parse(Handlebars.compile(new_content[this.state.es_query_id_incoming_events])({})),
                    },
                });
            } else if (this.state.es_query_id_past_events in new_content) {
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads.past_event,
                    path: this.state.paths.reads.past_event,
                    body: {
                        where: JSON.parse(Handlebars.compile(new_content[this.state.es_query_id_past_events])({})),
                    },
                });
            }
        },
    },
    mounted() {
    },
    computed: {
        incoming_events() {
            return this.mcontent(this.state.sinks.reads.incoming_event);
        },
        past_events() {
            return this.mcontent(this.state.sinks.reads.past_event);
        },
    },
};
