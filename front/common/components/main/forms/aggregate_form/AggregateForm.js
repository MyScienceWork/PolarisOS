const Vue = require('vue');
const Messages = require('../../../../api/messages');
const APIRoutes = require('../../../../api/routes');
const Utils = require('../../../../utils/utils');

const FormMixin = require('../../../../mixins/FormMixin');
const FormCleanerMixin = require('../../../../mixins/FormCleanerMixin');
const LangMixin = require('../../../../mixins/LangMixin');
const RequestsMixin = require('../../../../mixins/RequestsMixin.js');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin, RequestsMixin],
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
            let path = '';

            if (element !== 'text') {
                if (entity.path) {
                    path = entity.path;
                } else {
                    path = APIRoutes.entity(entity.name, 'POST', true);
                }
            }

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

            if (this.state.inputs[id].element !== 'text' && !entity.ajax) {
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

            return content;
        },
        get_translatable(id) {
            if (!(id in this.state.inputs)) {
                return false;
            }
            const entity = this.state.inputs[id].entity;
            const translatable = entity.translatable;
            return translatable;
        },
        get_use_hlang(id) {
            if (!(id in this.state.inputs)) {
                return false;
            }

            const entity = this.state.inputs[id].entity;
            const use_hlang = entity.hlang;
            return use_hlang;
        },
        get_field(type, entity) {
            if (!entity) {
                return 'type';
            }
            return entity[type];
        },
        get_ajax(type, info) {
            if (!info || !('entity' in info)) {
                return undefined;
            }

            switch (type) {
            default:
            case 'ajax':
                return info.entity.ajax || false;
            case 'ajax-value-url':
            case 'ajax-url':
                return info.entity.path || '';
            case 'search-fields':
                return info.entity.searchFields || info.entity.label;
            }
        },
        get_placeholder(info) {
            if (!info || !('placeholder' in info)) {
                return this.placeholder;
            }
            return info.placeholder;
        },
        reset() {
            const sinks = [this.sink, this.state.sinks.creations.dummy,
                this.state.sinks.creations.aggregate];
            sinks.map(sink => this.$store.state.requests.push({
                type: 'commit',
                name: Messages.NOOP,
                content: {
                    form: sink,
                },
            }));

            this.execute_requests().then(() => {
                sinks.map(sink => this.$store.state.requests.push({
                    type: 'commit',
                    name: Messages.INITIALIZE,
                    content: {
                        form: sink,
                    },
                }));
                Vue.nextTick(() => this.execute_requests().then(() => {}));
            });
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
            { label: this.lang('l_bool_and'), value: '$and' },
            { label: this.lang('l_bool_or'), value: '$or' },
            { label: this.lang('l_bool_not'), value: '$nand' },
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
