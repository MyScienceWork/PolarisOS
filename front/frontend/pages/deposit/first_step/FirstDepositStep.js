const LangMixin = require('../../../../common/mixins/LangMixin');
const APIRoutes = require('../../../../common/api/routes');

module.exports = {
    props: {
        typologyForm: { required: true, type: String },
        documentType: { default: '', type: String },
    },
    mixins: [LangMixin],
    data() {
        return {
            state: {
                chosen_doc_type: this.documentType,
            },
        };
    },
    methods: {
        grab_typology_child(path) {
            const p = path.split('.').map(idx => parseInt(idx, 10));
            const child = this.typology[p[0]].children[p[1]];
            this.$emit('typology-child-change', { child, path });
            return child;
        },
    },
    computed: {
        typology() {
            if (this.typologyForm in this.$store.state.forms) {
                const form = this.$store.state.forms[this.typologyForm].content || [];
                return form.map((t) => {
                    t.label = this.lang(t.label);
                    t.children = t.children.map((child) => {
                        child.label = this.lang(child.label);
                        return child;
                    });
                    return t;
                });
            }
            return [];
        },
    },
};
