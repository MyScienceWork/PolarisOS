const LangMixin = require('../../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        form: { required: true },
        cform: { type: String, required: true },
        prefix: { type: String, default: '' },
        single: { type: Boolean, default: false },
    },
    methods: {
        get_name(name) {
            if (this.prefix !== '') {
                return `${this.prefix}.${name}`;
            }
            return name;
        },
    },
};
