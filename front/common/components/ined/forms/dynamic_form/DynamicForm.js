const _ = require('lodash');
const LangMixin = require('../../../../mixins/LangMixin');
const Messages = require('../../../../api/messages');
const Routes = require('../../../../api/routes');
const CrudForm = require('./CrudForm.vue');

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
        get_datasource_options(field, ajax) {
            return (search, loading) => {
                if (!ajax) {
                    return;
                }

                this.$store.commit(Messages.INITIALIZE, {
                    keep_content: false,
                    form: `datasource_${field}_read`,
                });

                this.$store.dispath('search', {
                    path: Routes.entity(field.datasource.name, 'POST', true),
                    form: `datasource_${field}_read`,
                    body: {
                        size: 500,
                        projection: [field.datasource.label, field.datasource.value],
                        where: {
                            [field.datasource.label]: search,
                        },
                    },
                });
            };
        },
        generate_select_label(field) {
            if (field.range.enabled) {
                return 'label';
            }
            return field.datasource.label;
        },
        generate_select_value(field) {
            if (field.range.enabled) {
                return 'value';
            }
            return field.datasource.value;
        },
        generate_select_options(field) {
            if (field.range.enabled) {
                return _.range(field.range.start, field.range.end, field.range.step).map(v => ({ label: `${v}`, value: `${v}` }));
            }
            return this.datasource(field, field.datasource.ajax);
        },
    },
    computed: {
        datasource() {
            return (field, ajax) => {
                if (field.type !== 'select' && field.type !== 'multi-select') {
                    return [];
                }

                if (!ajax) {
                    const content = field.datasource.content || [];
                    if (field.datasource.translatable) {
                        return content.map((dc) => {
                            dc[field.datasource.label] = this.lang(dc[field.datasource.label]);
                            return dc;
                        });
                    }
                    return content;
                }
            };
        },
    },
};
