const VSelect = require('vue-select').VueSelect;
const InputMixin = require('../../mixins/InputMixin');
const Utils = require('../../../../../../../utils/utils');
const Messages = require('../../../../../../../api/messages');

module.exports = {
    props: {
        name: { required: true, type: String },
        label: { required: true, type: String },
        isRequired: { default: false, type: Boolean },
        form: { required: true, type: String },
        multi: { default: false, type: Boolean },
        options: { required: true, type: Array },
        fieldLabel: { required: false, default: 'label', type: String },
        fieldValue: { required: false, default: 'value', type: String },
    },
    components: {
        'v-select': VSelect,
    },
    mixins: [InputMixin],
    data() {
        return {
            state: {
                selected: null,
                options: [],
            },
        };
    },
    methods: {
        update() {
            const form = this.$store.state.forms[this.form];
            if (form.update) {
                let info = Utils.find_value_with_path(form.content, this.name.split('.'));
                if (info == null) {
                    // Noop
                } else if (info instanceof Array) {
                    info = info.map((o) => {
                        if (this.fieldLabel in o) {
                            return o;
                        }
                        const missing = this.options.filter(op =>
                            o[this.fieldValue] === op[this.fieldValue]);
                        if (missing.length > 0) {
                            o[this.fieldLabel] = missing[0][this.fieldLabel];
                            return o;
                        }
                        return null;
                    }).filter(o => o != null);
                } else if (typeof info === 'string') {
                    const missing = this.options.filter(o => info === o[this.fieldValue]);
                    if (missing.length > 0) {
                        info = { [this.fieldValue]: info,
                            [this.fieldLabel]: missing[0][this.fieldLabel] };
                    } else {
                        info = null;
                    }
                } else {
                    const missing = this.options.filter(o =>
                        info[this.fieldValue] === o[this.fieldValue]);
                    if (missing.length > 0) {
                        info = { [this.fieldValue]: info,
                            [this.fieldLabel]: missing[0][this.fieldLabel] };
                    } else {
                        info = null;
                    }
                }
                this.state.selected = info;
            }
        },
        onChange(val) {
            this.state.selected = val;
        },
        extract_values(infos) {
            if (infos == null) {
                return null;
            }

            if (infos instanceof Array) {
                return infos.map(o => o[this.fieldValue]);
            }
            return infos[this.fieldValue];
        },
        format_options() {
            if (this.fieldValue === 'value') {
                this.state.options = this.options;
            }

            this.state.options = this.options.map(o =>
                ({ [this.fieldLabel]: o[this.fieldLabel], value: o[this.fieldValue] }));
        },
    },
    watch: {
        reclaim(n) {
            if (n) {
                this.$store.commit(Messages.RECLAIM_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: this.extract_values(this.state.selected),
                });
            }
        },
        cancel(n) {
            if (n) {
                this.state.selected = null;
            }
        },
    },
    beforeMount() {
        this.format_options();
    },
};
