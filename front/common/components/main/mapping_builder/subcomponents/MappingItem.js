const moment = require('moment');
const _ = require('lodash');
const LangMixin = require('../../../../mixins/LangMixin');
const MappingTypes = require('../../../../lists/mapping_types');
const VSelect = require('vue-select').VueSelect;

module.exports = {
    mixins: [LangMixin],
    props: {
        removable: { type: Boolean, default: true },
        openable: { type: Boolean, default: true },
        name: { type: String, required: true },
        content: { type: Object, required: true },
    },
    components: {
        VSelect,
    },
    data() {
        return {
            state: {
                opened: false,
                name: this.name,
                type: null,
                extra: {
                    sortable: false,
                    completable: false,
                    indexable: true,
                    date_format: ''
                },
                content: this.content,
            },
        };
    },
    methods: {
        add_child() {
            const children = this.state.content.properties || {};
            children[`__field_name_${+moment()}__`] = {
                type: 'keyword',
            };
            this.state.content.properties = children;
            this.$forceUpdate();
        },
        remove_child(name) {
            this.$emit('remove-child', name);
        },
        remove_effective_child(name) {
            const children = this.state.content.properties || {};

            if (name in children) {
                delete children[name];
            }
            this.$forceUpdate();
        },
        generate() {
            if (!this.state.type || !this.state.name || this.state.name.trim() === '') {
                return null;
            }

            const type = this.state.type.value;
            if (type === 'object' || type === 'nested') {
                const children = _.reduce(this.$refs, (obj, value, name) => {
                    if (name.startsWith('item_')) {
                        obj[name] = value instanceof Array ? value[0] : value;
                    }
                    return obj;
                }, {});

                const subobj = _.reduce(children, (obj, value) =>
                    _.merge(obj, value.generate()), {});

                const obj = {
                    [this.state.name]: {
                        properties: subobj,
                    },
                };

                if (type === 'nested') {
                    obj[this.state.name].type = 'nested';
                }
                return obj;
            }

            const obj = {
                [this.state.name]: {
                    type: this.state.type.value,
                    index: this.state.extra.indexable,
                },
            };

            if (this.state.extra.sortable) {
                obj[this.state.name].fields = {
                    raw: {
                        type: 'keyword',
                    },
                };
            }

            if (this.state.extra.completable) {
                if (!('fields' in obj[this.state.name])) {
                    obj[this.state.name].fields = {};
                }

                obj[this.state.name].fields.__pauc = {
                    type: 'text',
                    analyzer: 'autocomplete',
                    search_analyzer: 'standard',
                };
            }

            if (type === 'date') {
                if (this.state.extra.date_format && this.state.extra.date_format.trim() !== ''){
                    obj[this.state.name].format = this.state.extra.date_format;
                }
            }

            return obj;
        },
        compute_type(content, mapping_types) {
            if (!content) {
                return null;
            }

            if (!mapping_types) {
                return null;
            }

            let type = null;
            if ('type' in content) {
                if (content.type === 'keyword') {
                    type = mapping_types.find(o => o.value === 'keyword');
                } else {
                    type = mapping_types.find(o => o.value === content.type);
                }
            } else if ('properties' in content) {
                type = mapping_types.find(o => o.value === 'object');
            }
            return type;
        },
        compute_extra(content) {
            const obj = {
                completable: false,
                sortable: false,
                indexable: true,
                date_format: '',
            };
            if (!content || !this.state.type) {
                return obj;
            }

            const type = this.state.type.value;

            if (type === 'keyword') {
                obj.sortable = true;
            }

            if ((type === 'text' || type === 'keyword') && 'fields' in content) {
                if ('raw' in content.fields && content.fields.raw.type === 'keyword') {
                    obj.sortable = true;
                }
                if ('__pauc' in content.fields) {
                    obj.completable = true;
                }
            }

            if ('index' in content) {
                obj.indexable = content.index;
            }

            if (type === 'date') {
                obj.date_format = content.format;
            }
            return obj;
        },
    },
    computed: {
        mapping_types() {
            return MappingTypes.map((m) => {
                m.label = this.lang(m.label);
                return m;
            });
        },
    },
    mounted() {
        this.state.type = this.compute_type(this.content, this.mapping_types);
        this.state.extra = this.compute_extra(this.content);
    },
};
