const LangMixin = require('../../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        form: { required: true },
        cform: { type: String, required: true },
        prefix: { type: String, default: '' },
        single: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
    },
    methods: {
        get_name(name) {
            if (this.prefix !== '') {
                return `${this.prefix}.${name}`;
            }
            return name;
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
