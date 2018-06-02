const LangMixin = require('../../../../mixins/LangMixin');
const MappingTypes = require('../../../../lists/mapping_types');
const VSelect = require('vue-select').VueSelect;

module.exports = {
    mixins: [LangMixin],
    props: {
        insertable: { type: Boolean, default: false },
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
            },
        };
    },
    computed: {
        mapping_types() {
            return MappingTypes.map((m) => {
                m.label = this.lang(m.label);
                return m;
            });
        },
    },
};
