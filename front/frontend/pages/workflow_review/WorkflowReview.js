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

const _ = require('lodash');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin, FiltersMixin,
        FormCleanerMixin, ESQueryMixin, RemoveMixin, OAMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        [this.entity()]: APIRoutes.entity(this.entity(), 'POST', true),
                        workflow: APIRoutes.entity('workflow', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        [this.entity()]: 'workflowinstance_read',
                        workflow: 'workflow_read',
                    },
                    creations: {
                        [this.entity()]: 'workflowinstance_creation',
                        search: 'workflowinstance_creation_search',
                    },
                },
                columns: this.columns || {},
                checked_rows: [],
                es_query_id: this.search_query || '__no__search__query__',
                visible_columns: 0,
                my_entity: '',
            },
        };
    },
    components: {
    },
    methods: {
        entity() {
            //return this.state.my_entity;
            return;
        },
        search_body() {
            return {
                size: 10000,
            };
        },
        show_success_read(form) {
            if (form !== this.state.sinks.reads.entity) {
                return;
            }

            const content = this.content_entity;
            if (content) {
                this.fetch_form(content.form, this.state.sinks.reads.form);
            }
        },
        on_column_update(obj) {
            // console.log('on column update', obj);
            this.state.columns[obj.key].visible = obj.checked;
            this.state.visible_columns = _.filter(this.state.columns, c => c.visible).length;
            this.$set(this.state, 'columns', this.state.columns);
            this.$forceUpdate();
        },
        on_checked_rows_update(obj) {
            this.$set(this.state, 'checked_rows', obj.checkedRows);
        },
    },
    mounted() {
        console.log('params : ', this.$route.params);
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.workflow,
            keep_content: false,
        });

        const instance = this.$route.params.workflowinstance;
        console.log('workflow instance : ', instance);

        const content_workflow = this.fcontent(this.state.sinks.reads.workflow);
        console.log('content_workflow : ', content_workflow);


        Object.keys(this.state.sinks.reads).forEach((sink) => {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads[sink],
                keep_content: false,
            });
        });
    },
    watch: {
        current_read_state_entity(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.entity)(s);
        },
        search_query(q) {
            if (q) {
                this.state.es_query_id = q;
            }
        },
        columns(cols) {
            if (cols) {
                this.state.columns = cols;
                this.state.visible_columns = _.filter(cols, c => c.visible).length;
            }
        },
    },
    computed: {
        current_read_state_entity() {
            return this.mcurrent_read_state(this.state.sinks.reads.entity);
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
