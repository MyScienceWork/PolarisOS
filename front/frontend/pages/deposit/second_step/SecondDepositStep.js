const _ = require('lodash');
const LangMixin = require('../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        form: { type: Object, required: true },
        subform: { type: String, default: 'required' },
    },
    data() {
        return {
            state: {
                cform: 'deposit_creation',
                path: 'ok',
                rpath: 'ok',
                rform: 'deposit_read',
            },
        };
    },
    computed: {
        final_form() {
            const results = this.form.fields.filter(f => f.name === this.subform && f.type === 'subform');
            if (results.length > 0) {
                const form = _.cloneDeep(this.form);
                form.fields = results;
                return form;
            }
            return this.form;
        },
    },
};
