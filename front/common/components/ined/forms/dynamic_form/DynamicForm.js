const _ = require('lodash');
const LangMixin = require('../../../../mixins/LangMixin');
const CrudForm = require('./CrudForm.vue');
const Handlebars = require('../../../../../../app/modules/utils/templating');

module.exports = {
    mixins: [LangMixin],
    props: {
        form: { required: true },
        cform: { type: String, required: true },
        prefix: { type: String, default: '' },
        single: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
    },
    components: {
        CrudForm,
    },
    methods: {
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
            return field.datasource.label;
        },
        generate_select_value(field) {
            if (field.range && field.range.enabled) {
                return 'value';
            }
            return field.datasource.value;
        },
        generate_select_options(field) {
            if (field.range && field.range.enabled) {
                return _.range(field.range.start, field.range.end, field.range.step).map(v => ({ label: `${v}`, value: `${v}` }));
            }
            return this.datasource(field);
        },
        generate_ajax_url(field, type = 'normal') {
            if (field.datasource.ajax) {
                const path = type === 'normal' ? field.datasource.ajax_path : field.datasource.ajax_value_path;
                const url = Handlebars.compile(path)({ lang: this.$store.state.interfaceLang });
                return url;
            }
            return '';
        },
        dropzone_analyze_file(filename) {
            this.$emit('dropzone-analyze-file', filename);
        },
    },
    computed: {
        datasource() {
            return (field) => {
                if (field.type !== 'select' && field.type !== 'multi-select') {
                    return [];
                }

                const content = field.datasource.content || [];
                if (field.datasource.translatable) {
                    return content.map((dc) => {
                        dc[field.datasource.label] = this.lang(dc[field.datasource.label]);
                        return dc;
                    });
                }
                return content;
            };
        },
    },
};
