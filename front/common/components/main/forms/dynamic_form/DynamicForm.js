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
        dynamic_list_search_query(field) {
            if (field.type !== 'dynamic-list') {
                return JSON.stringify([]);
            }
            const content = this.fcontent(this.cform);
            const dynamic_list_fields = field.dynamic_list;

            dynamic_list_fields.body = {};
            dynamic_list_fields.send_payload.forEach((key) => {
                if (key.value && content[key.value]) {
                    dynamic_list_fields.body[key.value] = content[key.value];
                }
            });
            const result = JSON.stringify({
                host: dynamic_list_fields.host,
                port: dynamic_list_fields.port,
                uri: dynamic_list_fields.uri,
                method: dynamic_list_fields.method,
                body: dynamic_list_fields.body,
            });
            return result;
        },
        dynamic_list_columns(field) {
            if (field.type !== 'dynamic-list') {
                return {};
            }
            return field.dynamic_list.result_table.reduce((obj, c) => {
                if (c.field && c.sort && c.title) {
                    obj[c.field] = c;
                    obj[c.field].visible = true;
                    obj[c.field].translatable = true;
                    obj[c.field].sortable = true;
                    obj[c.field].show_lang_key = true;
                    obj[c.field].centered = true;
                }
                return obj;
            }, {});
        },
    },
    computed: {
        columns() {
            if (this.form) {
                if (this.form.fields
                    && this.form.fields.length > 0) {
                    return this.form.fields.reduce((obj, c) => {
                        obj = this.dynamic_list_columns(c);
                        return obj;
                    }, {});
                }
            }
            return {};
        },
    },
};
