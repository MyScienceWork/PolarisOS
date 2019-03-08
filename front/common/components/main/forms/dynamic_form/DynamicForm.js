const _ = require('lodash');
const LangMixin = require('../../../../mixins/LangMixin');
const FormMixin = require('../../../../mixins/FormMixin');
const OAMixin = require('../../../../mixins/ObjectAccessMixin');
const FiltersMixin = require('../../../../mixins/FiltersMixin');
const APIRoutes = require('../../../../../common/api/routes');
const CrudForm = require('./CrudForm.vue');
const Handlebars = require('../../../../../../app/modules/utils/templating');
const Utils = require('../../../../utils/utils');
const Messages = require('../../../../../common/api/messages');

module.exports = {
    mixins: [LangMixin, FiltersMixin, FormMixin, OAMixin],

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
                columns: {},
                checked_rows: [],
                all_rows: [],
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
                },
            },
        };
    },
    components: {
        CrudForm,
    },
    mounted() {
        const fcontent = this.fcontent(this.cform);
        if (fcontent.disorder_list) {
            this.$set(this.state, 'all_rows', fcontent.disorder_list);
        }
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
                    return obj;
                }
                const dynamic_list_fields = field.dynamic_list;
                if (dynamic_list_fields) {
                    dynamic_list_fields.body = {};
                    dynamic_list_fields.send_payload.forEach((key) => {
                        if (key.value) {
                            dynamic_list_fields.body[key.value] = '';
                        }
                    });
                    obj = JSON.stringify({
                        host: dynamic_list_fields.host,
                        port: dynamic_list_fields.port,
                        uri: dynamic_list_fields.uri,
                        method: dynamic_list_fields.method,
                        body: dynamic_list_fields.body,
                    });
                }
                return obj;
            }, {});
            return result;
        },
        build_dynamic_list_columns() {
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
                        obj[result.field].sortable = false;
                        obj[result.field].show_lang_key = false;
                        obj[result.field].centered = true;
                        obj[result.field].lang = undefined;
                    }
                });
                return obj;
            }, {});
            return columns;
        },
        build_read_only() {
            return this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                return field.dynamic_list.read_only;
            }, false);
        },
        on_column_update(obj) {
            this.state.columns[obj.key].visible = obj.checked;
            this.$set(this.state, 'columns', this.state.columns);
        },
        dispatch_row_check(rows, status) {
            if (!(rows instanceof Array)) {
                return;
            }
            const result_mapping = this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                return field.dynamic_list.result_mapping;
            }, {});
            const selected_mapping = this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                return field.dynamic_list.selected_mapping;
            });
            if (!(result_mapping instanceof Array)) {
                return;
            }
            const authorized_keys = result_mapping.map(c => c.value_payload);

            let new_check_rows = {};

            authorized_keys.forEach((key) => {
                new_check_rows = rows.map((item_row, item_row_key) => {
                    if (item_row !== undefined) {
                        item_row = new_check_rows[item_row_key] || {};
                        item_row[key] = rows[item_row_key][key];
                        if (status) {
                            item_row[selected_mapping] = status;
                        } else if (this.state.all_rows && this.state.all_rows[item_row_key] && this.state.all_rows[item_row_key][selected_mapping]) {
                            item_row[selected_mapping] = this.state.all_rows[item_row_key][selected_mapping];
                        } else {
                            item_row[selected_mapping] = false;
                        }
                        return item_row;
                    }
                });
            });
            result_mapping.forEach((result) => {
                const all_keys = result.value_form.split('.');
                const root_key = all_keys[0];
                let new_rows = [];
                if (this.state.all_rows.length > 0) {
                    new_rows = Utils.merge_by_key(this.state.all_rows, new_check_rows, all_keys[all_keys.length - 1]);
                } else {
                    new_rows = new_check_rows;
                    this.$set(this.state, 'all_rows', new_rows);
                }

                const checked_rows = [];
                new_rows.forEach((row, new_row_key) => {
                    if (row[selected_mapping] === true) {
                        checked_rows.push(rows[new_row_key]);
                    }
                });
                this.$set(this.state, 'checked_rows', checked_rows);

                this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                    form: this.cform,
                    name: root_key,
                    info: new_rows,
                });
            });
        },
        on_checked_rows_update(row) {
            this.dispatch_row_check(row.checkedRows, true);
        },
        build_all_dynamic_list_columns() {
            this.state.columns = this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                return this.build_dynamic_list_columns(field);
            }, {});
            return this.state.columns;
        },
    },
    watch: {
        content_dynamic_list(dynamic_list) {
            this.dispatch_row_check(dynamic_list);
        },
    },
    computed: {
        dynamic_list_columns() {
            return this.build_all_dynamic_list_columns();
        },
        dynamic_list_search_query() {
            return this.build_search_query();
        },
        read_only() {
            return this.build_read_only();
        },
        content_dynamic_list() {
            return this.fcontent(this.state.sinks.reads.dynamic_list);
        },
    },
};
