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
        const cform_content = this.fcontent(this.cform);
        const { root_key } = this.dynamic_list_mappings();
        if (cform_content
            && cform_content[root_key] instanceof Array
            && cform_content[root_key].length > 0) {
            this.$set(this.state, 'all_rows', cform_content[root_key]);
            this.dispatch_row_check(cform_content[root_key], true);
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
            this.build_all_dynamic_list_columns();
        },
        map_api_result_to_form(result_mapping, select_field_name, rows, init) {
            const authorized_keys = result_mapping.map(c => c.value_payload);
            console.log('authorized_keys : ', authorized_keys);
            console.log('rows : ', rows);

            let updated_rows = [];
            updated_rows = this.state.all_rows.map((item_row) => {
                item_row[select_field_name] = false;
                return item_row;
            });

            console.log("1rows : ", rows);
            console.log("2updated_rows : ", updated_rows);

            let filtered_rows = [];

            authorized_keys.forEach((key) => {
                const new_rows = updated_rows.map((item_row, item_row_key) => {
                    if (rows[item_row_key]) {
                        item_row[key] = rows[item_row_key][key];
                        item_row[select_field_name] = true;
                    }
                    return item_row;
                });
                filtered_rows = Utils.merge_by_key(new_rows, filtered_rows, key);
                filtered_rows = Utils.merge_by_key(new_rows, filtered_rows, select_field_name);
            });

            console.log("filtered_rows : ", filtered_rows);

            return filtered_rows;
        },
        dynamic_list_mappings() {
            return this.form.fields.reduce((obj, field) => {
                if (field.type !== 'dynamic-list') {
                    return obj;
                }
                let root_key = '';
                //TODO: improve root key with a field in dynamic_list
                field.dynamic_list.result_mapping.forEach((result) => {
                    const all_keys = result.value_form.split('.');
                    root_key = all_keys[0];
                });
                return { result_mapping: field.dynamic_list.result_mapping,
                    select_field_name: field.dynamic_list.selected_mapping,
                    root_key };
            }, {});
        },
        dispatch_row_check(rows, init) {
            if (!(rows instanceof Array)) {
                return;
            }
            const { root_key, result_mapping, select_field_name } = this.dynamic_list_mappings();
            const new_rows = this.map_api_result_to_form(result_mapping, select_field_name, rows, init);
            const checked_rows = [];
            console.log("select_field_name : ", select_field_name);
            rows.forEach((row, row_index) => {
                console.log("row[select_field_name] : ", new_rows[row_index]);
                //console.log("new_rows[row_index][select_field_name] : ", new_rows[row_index][select_field_name]);
                if (new_rows[row_index] && new_rows[row_index][select_field_name] === true) {
                    checked_rows.push(row);
                }
            });
            console.log("new_rows : ", new_rows);
            console.log("checked_rows : ", checked_rows);
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.cform,
                name: root_key,
                info: new_rows,
            });
            this.$set(this.state, 'all_rows', new_rows);
            this.$set(this.state, 'checked_rows', checked_rows);
        },
        on_checked_rows_update(row) {
            this.dispatch_row_check(row.checkedRows);
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
        update_date(info) {
            if (info.info && info.name) {
                const new_selected_dates = Object.assign({}, this.state.selected_date);
                new_selected_dates[info.name] = new Date(info.info);
                this.$set(this.state, 'selected_date', new_selected_dates);
            }
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
