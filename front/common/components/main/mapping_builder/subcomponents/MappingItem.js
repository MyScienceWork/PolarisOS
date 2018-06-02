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
                name: this.name,
                opened: false,
                mapping_types: MappingTypes.map((m) => {
                    m.label = this.lang(m.label);
                    return m;
                }),
                type: null,
                extra: {
                    sortable: false,
                    completable: false,
                    indexable: true,
                },
            },
        };
    },
    methods: {
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
            return obj;
        },
    },
    computed: {
    },
    beforeMount() {
        this.state.type = this.compute_type(this.content, this.state.mapping_types);
        this.state.extra = this.compute_extra(this.content);
    },
};
