const Messages = require('../../../../api/messages');
const APIRoutes = require('../../../../api/routes');
const Utils = require('../../../../utils/utils');

const FormMixin = require('../../../../mixins/FormMixin');
const FormCleanerMixin = require('../../../../mixins/FormCleanerMixin');
const LangMixin = require('../../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    props: {
        selectPlaceholder: { default: 'l_select_content', type: String },
        label: { default: '', type: String },
        placeholder: { default: '', type: String },
        sink: { default: 'aggregate_form_read', type: String },
        specs: { required: true, type: Object },
    },
    data() {
        return {
            state: {
                variadic_name: 'pos_aggregate',
                sinks: {
                    creations: {
                        aggregate: 'aggregate_read',
                        dummy: 'dummy_form',
                    },
                    reads: {},
                },
                inputs: {},
            },
        };
    },
    methods: {
        search() {
            this.$emit('aggregate-search');
        },
        select(val, id) {
            if (val == null) {
                if (id in this.state.inputs) {
                    this.$store.commit(Messages.REMOVE_FORM, {
                        form: this.state.inputs[id].sink,
                    });
                    delete this.state.inputs[id];
                }
                return;
            }

            const info = this.specs[val.value];
            const sink = `${val.value}_read`;
            const element = info.element;
            const entity = info.entity || {};
            const path = element !== 'text' ? APIRoutes.entity(entity.name, 'POST', true) : '';

            this.state.inputs = Object.assign({}, this.state.inputs, { [id]: {
                element,
                name: `${this.state.variadic_name}.${id}.${val.value}`,
                selected: val,
                sink,
                entity,
                path,
            } });

            this.$store.commit(Messages.INITIALIZE, {
                form: sink,
            });

            if (this.state.inputs[id].element !== 'text') {
                this.$store.dispatch('search', {
                    form: sink,
                    path,
                    body: {
                        projection: [entity.label, entity.value],
                    },
                });
            }
        },
        select_component(id) {
            if (!(id in this.state.inputs)
                || this.state.inputs[id].element === 'text') {
                return 'finput';
            }
            return 'fselect';
        },
        get_options(id, sink) {
            if (!sink) {
                return [];
            }

            const content = this.fcontent(sink);
            if (!(content instanceof Array)) {
                return [];
            }

            const entity = this.state.inputs[id].entity;
            const label_key = entity.label;
            const translatable = entity.translatable;
            if (translatable) {
                return content.map((e) => {
                    e[label_key] = this.lang(e[label_key]);
                    return e;
                });
            }
            return content;
        },
        get_field(type, entity) {
            if (!entity) {
                return 'type';
            }
            return entity[type];
        },
    },
    watch: {
    },
    computed: {
        options() {
            return Object.keys(this.specs).map((k) => {
                const object = this.specs[k];
                return { label: this.lang(object.label), value: k };
            });
        },
        bool_options() {
            return [
            { label: 'l_bool_and', value: 'and' },
            { label: 'l_bool_or', value: 'or' },
            { label: 'l_bool_not', value: 'not' },
            ];
        },
    },
    beforeMount() {
        /* const val = { value: Object.keys(this.specs)[0] };
        const id = 0;
        console.log(val, id);
        this.select(val, id);*/
    },
};
