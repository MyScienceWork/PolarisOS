const _ = require('lodash');
const APIRoutes = require('../api/routes');
const LangMixin = require('./LangMixin');

module.exports = {
    mixins: [LangMixin],
    computed: {
        datasources() {
            return this.$store.state.datasources;
        },
        forms() {
            if (this.state.forms.name in this.$store.state.forms) {
                const myform = this.$store.state.forms[this.state.forms.name];
                const content = myform.content;

                const datasources = content
                .reduce((sources, form) => {
                    const srcs = form.fields.reduce((obj, field) => {
                        if (field.type === 'select' && !field.datasource.ajax) {
                            obj[field.datasource.name] = {
                                label: field.datasource.label,
                                value: field.datasource.value,
                            };
                        }
                        return obj;
                    }, {});
                    return _.merge(sources, srcs);
                }, {});
                console.log('datasources to fetch', datasources);
                this.$store.dispatch('grab_datasources', { datasources });

                const forms = content.reduce((obj, form) => {
                    form.label = this.lang(form.label);
                    form.description = this.lang(form.description);
                    form.fields = form.fields.map((field) => {
                        field.label = this.lang(field.label);
                        return field;
                    });
                    obj[form.name] = _.cloneDeep(form);
                    return obj;
                }, {});
                return _.reduce(forms, (obj, form, name) => {
                    if (form.has_subforms) {
                        form.fields = form.fields.map((field) => {
                            if (field.type === 'subform') {
                                field.subform = forms[field.subform];
                            }
                            return field;
                        });
                    }
                    obj[name] = form;
                    return obj;
                }, {});
            }
            return {};
        },
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.forms.name,
            path: APIRoutes.entity('form', 'POST', true),
            body: {
                size: 1000,
                where: {
                    $or: [{ name: this.state.forms.fname }, { 'parents.name': this.state.forms.fname }],
                },
            },
        });
    },
};
