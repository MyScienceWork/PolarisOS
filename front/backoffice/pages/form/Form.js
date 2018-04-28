const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const Queries = require('../../../common/specs/queries');
const FieldTypes = require('../../../common/lists/fieldtypes');
const SubformTypes = require('../../../common/lists/subformtypes');

module.exports = {
    mixins: [LangMixin, ReaderMixin, FormCleanerMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        form: 'form_creation',
                    },
                    reads: {
                        form: 'form_read',
                        all_form: 'all_form_read',
                        entity: 'entity_read',
                        importer: 'importer_read',
                        query: 'query_read',
                    },
                },
                paths: {
                    creations: {
                        form: APIRoutes.entity('form', 'POST'),
                    },
                    reads: {
                        form: APIRoutes.entity('form', 'POST', true),
                        all_form: APIRoutes.entity('form', 'POST', true),
                        entity: APIRoutes.entity('entity', 'POST', true),
                        importer: APIRoutes.entity('importer', 'POST', true),
                        query: APIRoutes.entity('query', 'POST', true),
                    },
                },
                selected_types: {},
                selected_subform_types: {},
            },
        };
    },
    methods: {
        type_change(val, idx) {
            if (val == null) {
                if (idx in this.state.selected_types) {
                    delete this.state.selected_types[idx];
                }
            } else {
                this.$set(this.state.selected_types, idx, val.value);
            }
        },
        subform_type_change(val, idx) {
            if (val == null) {
                if (idx in this.state.selected_subform_types) {
                    delete this.state.selected_subform_types[idx];
                }
            } else {
                this.$set(this.state.selected_subform_types, idx, val.value);
            }
        },
    },
    mounted() {
        [['entity', ['type']], ['importer', ['name']], ['query', ['name', 'id']], ['all_form', ['label']]]
            .forEach((e) => {
                this.$store.dispatch('search', {
                    form: this.state.sinks.reads[e[0]],
                    path: this.state.paths.reads[e[0]],
                    body: {
                        projection: e[1],
                        size: 10000,
                    },
                });
            });
    },
    computed: {
        importers() {
            const content = this.fcontent(this.state.sinks.reads.importer);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
        queries() {
            const content = this.fcontent(this.state.sinks.reads.query);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
        forms() {
            const content = this.fcontent(this.state.sinks.reads.all_form);
            if (content instanceof Array) {
                return content;
            }
            return [];
        },
        entities() {
            const content = this.fcontent(this.state.sinks.reads.entity);
            if (content instanceof Array) {
                // TODO make this WAY cleaner;
                content.push({ type: 'entity' });
                content.push({ type: 'form' });
                content.push({ type: 'pipeline' });
                content.push({ type: 'user' });
                content.push({ type: 'role' });
                return content;
            }
            return [];
        },
        fieldtypes() {
            return FieldTypes.map(ft => ({ value: ft.value, label: this.lang(ft.label) }));
        },
        subform_types() {
            return SubformTypes.map(ft => ({ value: ft.value, label: this.lang(ft.label) }));
        },
        search_query() {
            return JSON.stringify(Queries.form);
        },
    },
};
