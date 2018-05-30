const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
// const FormMixin = require('../../../common/mixins/FormMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
// const PaginationSearchMixin = require('../../../common/mixins/PaginationSearchMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const Handlebars = require('../../../../app/modules/utils/templating');
const moment = require('moment');

module.exports = {
    mixins: [LangMixin, ReaderMixin, UserMixin, ESQueryMixin],
    data() {
        return {
            state: {
                isAdministrator: false,
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
        if (this.roles.administrator && this.roles.administrator.id === 'administrator') {
            this.state.isAdministrator = true;
        }
        console.log(`query::${this.es_query_contents}`);

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.incoming_event,
            path: this.state.paths.reads.incoming_event,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.past_event,
            path: this.state.paths.reads.past_event,
            body: {
                where: {
                    id: this.state.es_query_id_past_events,
                },
            },
        });
    },
    computed: {
        incoming_events() {
            const content = this.mcontent(this.state.sinks.reads.incoming_event);
            return content.filter(elmt => elmt.endDate > moment());
        },
        past_events() {
            return this.mcontent(this.state.sinks.reads.past_event).filter(elmt => elmt.endDate < moment());
        },
    },
};
