const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const FiltersMixin = require('../../../common/mixins/FiltersMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin, FiltersMixin, FormCleanerMixin, ESQueryMixin],
    data() {
        return {
            state: {
                paths: {
                    creations: {
                        [this.entity()]: APIRoutes.entity(this.entity(), 'POST'),
                    },
                    reads: {
                        [this.entity()]: APIRoutes.entity(this.entity(), 'POST', true),
                        entity: APIRoutes.entity('entity', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        [this.entity()]: 'datainstance_read',
                        entity: 'entity_read',
                        form: 'datainstance_form',
                    },
                    creations: {
                        [this.entity()]: 'datainstance_creation',
                        search: 'datainstance_creation_search',
                    },
                },
                columns: this.columns || {},
                checked_rows: [],
                es_query_id: this.search_query || '__no__search__query__',
            },
        };
    },
    methods: {
        entity() {
            const instance = this.$route.params.datainstance;
            return instance;
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
            this.$set(this.state, 'columns', this.state.columns);
            this.$forceUpdate();
        },
        on_checked_rows_update(obj) {
            this.$set(this.state, 'checked_rows', obj.checkedRows);
        },
    },
    mounted() {
        Object.keys(this.state.sinks.reads).forEach((sink) => {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads[sink],
                keep_content: false,
            });
        });

        this.$store.state.requests.push({
            name: 'search',
            content: {
                form: this.state.sinks.reads.entity,
                path: this.state.paths.reads.entity,
                body: {
                    where: {
                        type: this.entity(),
                    },
                },
            },
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
