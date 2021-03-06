const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const OAMixin = require('../../../common/mixins/ObjectAccessMixin');
const RemoveMixin = require('../../../common/mixins/RemoveMixin');
const UserMixin = require('../../../common/mixins/UserMixin');

const _ = require('lodash');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin, FiltersMixin, FormCleanerMixin,
        ESQueryMixin, RemoveMixin, OAMixin, UserMixin],
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
                workflow_entity: 'publication',
                table_ready: false,
            },
        };
    },
    methods: {
        on_column_update(obj) {
            this.state.columns[obj.key].visible = obj.checked;
            this.$set(this.state, 'columns', this.state.columns);
            this.$forceUpdate();
        },
        on_checked_rows_update(obj) {
            this.$set(this.state, 'checked_rows', obj.checkedRows);
        },
        filtered_states() {
            const workflows = this.fcontent(this.state.sinks.reads.workflow);
            let filtered_states = [];

            const workflow_name = this.$route.query.workflow;
            const idx = _.findIndex(workflows, workflow => workflow.name === workflow_name);
            if (idx !== -1) {
                workflows[idx].steps.forEach((step) => {
                    if (step.roles.length > 0) {
                        step.roles.some((role_workflow) => {
                            const indexRole = _.findKey(this.roles, role_user => role_user._id === role_workflow._id);
                            if (indexRole !== undefined) {
                                filtered_states = filtered_states.concat(step.state_before.map(state => state._id));
                                return true;
                            }
                            return false;
                        });
                    }
                });
            }
            return { $fand: [{ state: filtered_states }] };
        },
        build_search_query() {
            const query_content = JSON.parse(this.es_query_content);
            const filtered_states = this.filtered_states();
            if (query_content && filtered_states) {
                return _.extend(query_content, filtered_states);
            } else if (filtered_states) {
                return filtered_states;
            }
            return this.es_query_content;
        },
        build_empty_search_query() {
            const filtered_states = this.filtered_states();
            if (filtered_states) {
                return filtered_states;
            }
            return JSON.stringify({});
        },
    },
    mounted() {
        ['workflow'].forEach((e) => {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 10000,
                    where: {
                        entity: this.state.workflow_entity,
                    },
                },
            });
        });
        ['entity'].forEach((e) => {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 10000,
                    where: {
                        type: this.state.workflow_entity,
                    },
                },
            });
        });
    },
    watch: {
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
        workflow_read(workflow) {
            this.state.sinks.reads[this.state.workflow_entity] = `${this.state.workflow_entity}_read`;
            this.state.paths.reads[this.state.workflow_entity] = APIRoutes.entity(this.state.workflow_entity, 'POST', true);

            //TODO: add allowed states before with workflow mixin new function

            [this.state.workflow_entity].forEach((e) => {
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads[e],
                    path: this.state.paths.reads[e],
                });
            });
            this.state.table_ready = true;
        },
    },
    computed: {
        content_entity() {
            const content = this.mcontent(this.state.sinks.reads.entity);
            if (content.length > 0) {
                return content[0];
            }
            return null;
        },
        search_query_with_state_filters() {
            const search_query = JSON.stringify(this.build_search_query(), null, 4);
            return search_query;
        },
        empty_search_query_with_state_filters() {
            const search_query = JSON.stringify(this.build_empty_search_query(), null, 4);
            return search_query;
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
        workflow_read() {
            const content = this.fcontent(this.state.sinks.reads.workflow);
            return content;
        },
    },
};
