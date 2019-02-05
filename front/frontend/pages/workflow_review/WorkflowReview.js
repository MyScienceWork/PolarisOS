const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const OAMixin = require('../../../common/mixins/ObjectAccessMixin');
const RemoveMixin = require('../../../common/mixins/RemoveMixin');
const Queries = require('../../../common/specs/queries');

const _ = require('lodash');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin, FiltersMixin,
        FormCleanerMixin, ESQueryMixin, RemoveMixin, OAMixin],
    data() {
        return {
            state: {
                itemsPerPage: 1000,
                itemsPerRow: 1,
                filters: [],
                paths: {
                    reads: {
                        entity: APIRoutes.entity('entity', 'POST', true),
                        workflow: APIRoutes.entity('workflow', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        entity: 'entity_read',
                        workflow: 'workflow_read',
                        workflow_entity: 'workflow_entity_read',
                    },
                    creations: {
                        search: 'search_creation_workflow',
                    },
                },
                columns: this.columns || {},
                checked_rows: [],
                es_query_id: this.search_query || '__no__search__query__',
                my_entity: '',
            },
        };
    },
    methods: {
        workflow_name() {
            return this.$route.query.workflow;
        },
        entity() {
            if (this.state.my_entity) {
                return this.state.my_entity;
            }
            return '__no__entity__defined__';
        },
        on_column_update(obj) {
            this.state.columns[obj.key].visible = obj.checked;
            this.$set(this.state, 'columns', this.state.columns);
            this.$forceUpdate();
        },
        on_checked_rows_update(obj) {
            this.$set(this.state, 'checked_rows', obj.checkedRows);
        },
    },
    mounted() {
        ['workflow'].forEach((e) => {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 10000,
                },
            });
        });
    },
    watch: {
        current_read_state_entity(s) {
            console.log('WATCH current_read_state_entity : ', s);
            // return this.mwcurrent_read_state(this.state.sinks.reads.entity)(s);
        },
        search_query(q) {
            if (q) {
                this.state.es_query_id = q;
            }
        },
        columns(cols) {
            if (cols) {
                this.state.columns = cols;
            }
        },
    },
    computed: {
        current_read_state_entity() {
            const workflows = this.fcontent(this.state.sinks.reads.workflow);
            if (workflows.length === 0) {
                return;
            }
            const workflow_name = this.$route.query.workflow;
            const idx = _.findIndex(workflows, workflow => workflow.name === workflow_name);
            if (idx === -1) {
                return;
            }
            const workflow_entity = workflows[idx].entity;
            if (this.state.my_entity === workflow_entity) {
                return;
            }
            this.state.my_entity = workflow_entity;
            this.state.sinks.reads[workflow_entity] = `${workflow_entity}_read`;
            this.state.paths.reads[workflow_entity] = APIRoutes.entity(workflow_entity, 'POST', true);
            [workflow_entity].forEach((e) => {
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads[e],
                    path: this.state.paths.reads[e],
                    body: {
                        size: 100,
                    },
                });
            });
            ['entity'].forEach((e) => {
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads[e],
                    path: this.state.paths.reads[e],
                    body: {
                        where: {
                            type: workflow_entity,
                        },
                    },
                });
            });
        },
        content_entity() {
            const content = this.mcontent(this.state.sinks.reads.entity);
            if (content.length > 0) {
                return content[0];
            }
            return null;
        },
        search_query() {
            if (this.content_entity) {
                return this.content_entity.search_query;
            }
            return '__no__search__query__';
        },
        columns() {
            if (this.content_entity && this.content_entity.backoffice) {
                return this.content_entity.backoffice.columns.reduce((obj, c) => {
                    const l = c.lang && c.lang.trim() !== '' ? c.lang : undefined;
                    obj[c.field] = c;
                    obj[c.field].visible = true;
                    obj[c.field].lang = l;
                    return obj;
                }, {});
            }
            return {};
        },
    },
};
