const _ = require('lodash');
const LangMixin = require('../../../../mixins/LangMixin');
const FormMixin = require('../../../../mixins/FormMixin');
const OAMixin = require('../../../../mixins/ObjectAccessMixin');
const ReaderMixin = require('../../../../mixins/ReaderMixin');
const FiltersMixin = require('../../../../mixins/FiltersMixin');
const FormCleanerMixin = require('../../../../mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../../mixins/ESQueryMixin');
const RemoveMixin = require('../../../../mixins/RemoveMixin');
const APIRoutes = require('../../../../../common/api/routes');
const CrudForm = require('./CrudForm.vue');
const Handlebars = require('../../../../../../app/modules/utils/templating');
const Utils = require('../../../../utils/utils');

module.exports = {
    mixins: [LangMixin, OAMixin, FormMixin, ReaderMixin, LangMixin,
        FiltersMixin, FormCleanerMixin, ESQueryMixin, RemoveMixin],

    props: {
        form: { required: true },
        cform: { type: String, required: true },
        prefix: { type: String, default: '' },
        single: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
    },
    data() {
        return {
            state: {
                columns: this.columns || {},
                checked_rows: [],
                show: {},
                paths: {
                    reads: {
                        dynamic_list: APIRoutes.external(),
                    },
                },
                sinks: {
                    reads: {
                        dynamic_list: 'dynamic_list_read',
                    },
                    creations: {
                        dynamic_list: 'dynamic_list_creation',
                    },
                },
            },
        };
    },
    components: {
        CrudForm,
    },
    mounted() {
    },
    watch: {
        columns(cols) {
            if (cols) {
                this.state.columns = cols;
            }
        },
    },
    methods: {
        get_component(type) {
            switch (type) {
            case 'multi-select':
            case 'select':
                return 'fselect';
            case 'color':
                return 'fcolor';
            default:
                return 'finput';
            }
        },
        form_is_of_type(type, field) {
            if (type === 'section' || type === 'widget' || type === 'hidden') {
                return field.type === 'subform'
                    && field.subform_information
                    && field.subform_information.type === type
                    && field.subform_information.title;
            }
            return false;
        },
        show_hidden_form(field) {
            this.$set(this.state.show, field.name, !this.state.show[field.name]);
        },
        crud_form_change(val) {
            this.$emit('crud-form-change', val);
        },
        get_name(name) {
            if (this.prefix !== '') {
                return `${this.prefix}.${name}`;
            }
            return name;
        },
        generate_select_label(field) {
            if (field.range && field.range.enabled) {
                return 'label';
            }

            if (field.datasource) {
                return field.datasource.label;
            }

            return '';
        },
        generate_select_value(field) {
            if (field.range && field.range.enabled) {
                return 'value';
            }

            if (field.datasource) {
                return field.datasource.value;
            }
            return '';
        },
        generate_select_options(field) {
            if (field.range && field.range.enabled) {
                return _.range(field.range.start, field.range.end, field.range.step).map(v => ({ label: `${v}`, value: `${v}` }));
            }
            return this.datasource(field);
        },
        generate_ajax_url(field, type = 'normal') {
            if (field.datasource && field.datasource.ajax) {
                const path = type === 'normal' ? field.datasource.ajax_path : field.datasource.ajax_value_path;
                const url = Handlebars.compile(path)({ lang: this.$store.state.interfaceLang });
                return url;
            }
            return '';
        },
        generate_ajax_search(field, type = 'size') {
            switch (type) {
            case 'size': {
                if (field.datasource && field.datasource.size) {
                    return parseInt(field.datasource.size, 10);
                }
                return 10;
            }
            case 'fields': {
                if (field.datasource && field.datasource.search_fields) {
                    return field.datasource.search_fields;
                }
                return '';
            }
            default:
                return null;
            }
        },
        dropzone_analyze_file(filename) {
            this.$emit('dropzone-analyze-file', filename);
        },
        datasource(field) {
            if (field.type !== 'select' && field.type !== 'multi-select') {
                return [];
            }


            let content = [];
            if (field.datasource.fetch_from_sink) {
                content = this.fcontent(field.datasource.sink);
                if (field.datasource.info_in_sink && field.datasource.info_in_sink.trim() !== '') {
                    content = Utils.find_value_with_path(content, field.datasource.info_in_sink.trim().split('.')) || [];
                }
            } else {
                content = field.datasource.content || [];
            }
            return content;
        },
        build_search_query() {
            const result = this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return {};
                }
                const content = this.fcontent(this.cform);
                const dynamic_list_fields = field.dynamic_list;
                if (dynamic_list_fields) {
                    dynamic_list_fields.body = {};
                    dynamic_list_fields.send_payload.forEach((key) => {
                        if (key.value && content[key.value]) {
                            dynamic_list_fields.body[key.value] = content[key.value];
                        }
                    });
                    return JSON.stringify({
                        host: dynamic_list_fields.host,
                        port: dynamic_list_fields.port,
                        uri: dynamic_list_fields.uri,
                        method: dynamic_list_fields.method,
                        body: dynamic_list_fields.body,
                    });
                }
                return JSON.stringify({});
            }, {});
            return result;
        },
        dynamic_list_columns() {
            const columns = this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                const l = field.dynamic_list;
                l.result_table.forEach((result) => {
                    if (result && result.field
                        && result.sort
                        && result.title) {
                        obj[result.field] = result;
                        obj[result.field].visible = true;
                        obj[result.field].translatable = true;
                        obj[result.field].sortable = true;
                        obj[result.field].show_lang_key = false;
                        obj[result.field].centered = true;
                        obj[result.field].lang = undefined;
                    }
                });
                return obj;
            }, {});
            return columns;
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
    computed: {
        columns() {
            const result = this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                const columns = this.dynamic_list_columns(field);
                return columns;
            }, {});
            return result;
        },
        dynamic_list_search_query() {
            return this.build_search_query();
        },
    },
};
