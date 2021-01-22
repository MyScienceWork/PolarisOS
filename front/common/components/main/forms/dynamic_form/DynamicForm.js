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
        allowGrobid: { type: Boolean, default: true },
        index: { type: Number, default: undefined },
    },
    data() {
        return {
            state: {
                columns: {},
                checked_rows: [],
                selected: [],
                selected_date: {},
                show: {},
                paths: {
                    reads: {
                        dynamic_list: APIRoutes.external(),
                    },
                },
                sinks: {
                    reads: {
                        dynamic_list: {},
                    },
                },
                last_changed_input: {
                    value: null,
                    name: '',
                },
            },
        };
    },
    components: {
        CrudForm,
    },
    beforeMount() {
        const list_mappings = this.dynamic_list_mappings();
        if (list_mappings === undefined) {
            return;
        }

        Object.keys(list_mappings).forEach((list_mapping) => {
            this.state.sinks.reads.dynamic_list[list_mapping] = `dynamic_list_read_${list_mapping}`;
        });
    },
    mounted() {
        let cform_content = {};
        if (this.index) {
            cform_content = this.fcontent(this.cform)[this.index];
        } else {
            cform_content = this.fcontent(this.cform);
        }
        const list_mappings = this.dynamic_list_mappings();
        if (list_mappings === undefined) {
            return;
        }
        Object.keys(list_mappings).forEach((list_mapping) => {
            const { root_key, select_field_name } = list_mappings[list_mapping];

            if (cform_content
                && cform_content[root_key] instanceof Array
                && cform_content[root_key].length > 0) {
                // init raw table from database
                this.$store.commit(Messages.READ, {
                    form: this.state.sinks.reads.dynamic_list[list_mapping],
                    content: cform_content[root_key],
                });
                // init checked rows
                this.$set(this.state, 'checked_rows', { [root_key] : cform_content[root_key].filter(item_row => item_row[select_field_name] === true) });
            }
        });
    },
    methods: {
        get_component(type) {
            switch (type) {
            case 'multi-select':
            case 'select':
                return 'fselect';
            case 'color':
                return 'fcolor';
            case 'radio':
                return 'fradio';
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
            if (field.datasource && field.datasource.sort) {
                return _.orderBy(this.datasource(field), [field.datasource.sort], ['asc']);
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
            if (field.type !== 'select' && field.type !== 'multi-select' && field.type !== 'radio') {
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
                    obj[field.name] =
                        JSON.stringify({
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
        build_dynamic_list_columns(myField) {
            return this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list' || myField.name !== field.name) {
                    return obj;
                }
                const l = field.dynamic_list;
                l.result_table.forEach((result) => {
                    if (result && result.field
                        && result.sort
                        && result.title) {
                        obj[result.field] = result;
                        if (this.state.columns[result.field]) {
                            obj[result.field].visible = this.state.columns[result.field].visible;
                        } else {
                            obj[result.field].visible = true;
                        }
                        obj[result.field].translatable = true;
                        obj[result.field].sortable = false;
                        obj[result.field].show_lang_key = false;
                        obj[result.field].centered = true;
                        obj[result.field].lang = undefined;
                    }
                });
                return obj;
            }, {});
        },
        build_read_only() {
            const readOnly = this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                obj[field.name] = field.readonly;
                return obj;
            }, {});
            return readOnly;
        },
        on_column_update(obj) {
            this.state.columns[obj.name][obj.key].visible = obj.checked;
            this.$set(this.state, 'columns', this.state.columns);
            this.build_all_dynamic_list_columns();
        },
        dynamic_list_mappings() {
            if (this.form.fields === undefined) {
                return;
            }
            return this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                let root_key = '';
                // TODO: improve root key with a field in dynamic_list
                field.dynamic_list.result_mapping.forEach((result) => {
                    const all_keys = result.value_form.split('.');
                    root_key = all_keys[0];
                });
                obj[field.name] = {
                    name: field.name,
                    result_mapping: field.dynamic_list.result_mapping,
                    select_field_name: field.dynamic_list.selected_mapping,
                    root_key };
                return obj;
            }, {});
        },
        build_all_dynamic_list_columns() {
            this.state.columns = this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                obj[field.name] = this.build_dynamic_list_columns(field);
                return obj;
            }, {});
            return this.state.columns;
        },
        update_date(info) {
            if (info.info && info.name) {
                const new_selected_dates = Object.assign({}, this.state.selected_date);
                new_selected_dates[info.name] = new Date(info.info);
                this.$set(this.state, 'selected_date', new_selected_dates);
            }
        },
        filter_authorized_fields(rows, form_name) {
            if (rows === undefined) {
                return [];
            }
            if (!(rows instanceof Array)) {
                rows = [rows];
            }
            const { result_mapping, select_field_name } = this.dynamic_list_mappings()[form_name];
            const authorized_keys = result_mapping.map(c => c.value_payload);
            const filtered_rows = [];
            authorized_keys.forEach((key) => {
                rows.forEach((item_row, item_row_key) => {
                    if (filtered_rows[item_row_key] === undefined) {
                        filtered_rows[item_row_key] = {};
                    }
                    filtered_rows[item_row_key][key] = item_row[key];
                });
            });

            rows.forEach((item_row, item_row_key) => {
                filtered_rows[item_row_key][select_field_name] = item_row[select_field_name];
            });

            return filtered_rows;
        },
        dispatch_row_check(checked_rows, updated_row, form_name) {
            const { root_key, select_field_name } = this.dynamic_list_mappings()[form_name];

            const cform_content = this.fcontent(this.cform);
            const filtered_rows_actual = this.filter_authorized_fields(cform_content[root_key], form_name);
            const filtered_rows_checked = this.filter_authorized_fields(checked_rows, form_name);
            const filtered_row_changed = this.filter_authorized_fields(updated_row, form_name);

            const filtered_rows = filtered_rows_actual.map((item_raw) => {
                delete item_raw[select_field_name];
                return item_raw;
            });
            filtered_rows.forEach((filtered_row, idx0) => {
                const idx1 = filtered_rows_checked.findIndex(raw => JSON.stringify(raw) === JSON.stringify(filtered_row));
                const idx2 = filtered_row_changed.findIndex(raw => JSON.stringify(raw) === JSON.stringify(filtered_row));

                if (idx1 !== -1 && filtered_rows[idx1]) {
                    filtered_rows[idx0][select_field_name] = true;
                } else if (idx2 !== -1 && filtered_rows_actual[idx2][select_field_name]) {
                    filtered_rows[idx0][select_field_name] = !(filtered_rows_actual[idx2][select_field_name]);
                } else {
                    filtered_rows[idx0][select_field_name] = false;
                }
            });
            return filtered_rows;
        },
        update_rows_from_api(data, form_name) {
            if (!(data instanceof Array)) {
                return;
            }
            const filtered_rows = this.filter_authorized_fields(data, form_name);
            const { select_field_name } = this.dynamic_list_mappings()[form_name];
            filtered_rows.map((item_raw) => {
                if (item_raw[select_field_name] === undefined) {
                    item_raw[select_field_name] = false;
                }
                return item_raw;
            });
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.cform,
                name: form_name,
                info: filtered_rows,
            });
        },
        on_checked_rows_update(row) {
            const form_name = row.name;
            const { root_key, select_field_name } = this.dynamic_list_mappings()[form_name];

            let cform_content = this.fcontent(this.cform)[root_key];

            if (row.checkedRow) {
                // row.checkedRow is the row changed
                cform_content = this.dispatch_row_check(row.checkedRows, row.checkedRow, form_name);
            } else if (row.checkedRows.length === 0) {
                // global checkbox has been unchecked
                cform_content = cform_content.map((cfom_row) => {
                    cfom_row[select_field_name] = false;
                    return cfom_row;
                });
            } else {
                // global checkbox has been checked
                cform_content = cform_content.map((cfom_row) => {
                    cfom_row[select_field_name] = true;
                    return cfom_row;
                });
            }

            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.cform,
                name: root_key,
                info: cform_content,
            });
        },
        on_update_data_from_api(data) {
            this.update_rows_from_api(data.data, data.name);
        },
        update_checkbox(info) {
            const { value, name } = info;
            this.state.last_changed_input.name = name;
            this.state.last_changed_input.value = value;
        },
        translate_conditional_readonly(field_conditional_readonly) {
            const name = field_conditional_readonly.substr(0, field_conditional_readonly.indexOf('=')).replace(/\s+/g, '');
            const value = field_conditional_readonly.substr(field_conditional_readonly.indexOf('=') + 1, field_conditional_readonly.size()).replace(/\s+/g, '');
            return {
                name,
                value,
            };
        },
    },
    watch: {
        content_dynamic_list(datas) {
            if (!(datas instanceof Array)) {
                return;
            }
            datas.forEach((data) => {
                this.update_rows_from_api(data);
            });
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
        compute_conditional_readonly(field_conditional_readonly, i) {
            console.log(field_conditional_readonly, i);
            if (!field_conditional_readonly.includes('=')) {
                return false;
            }
            const compare = this.translate_conditional_readonly(field_conditional_readonly);
            if (compare.name !== this.state.last_changed_input.name) {
                return false;
            }
            const { value } = compare;
            if (value === 'true') {
                return this.state.last_changed_input.value;
            }
            if (value === 'false') {
                return !this.state.last_changed_input.value;
            }
            return value === this.state.last_changed_input.value;
        },
    },
};
