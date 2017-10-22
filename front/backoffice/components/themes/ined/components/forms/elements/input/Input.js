const Messages = require('../../../../api/messages');
const Utils = require('../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');

module.exports = {
    mixins: [InputMixin],
    props: {
        name: { required: true, type: String },
        label: { required: true, type: String },
        placeholder: { required: true, type: String },
        isRequired: { default: false, type: Boolean },
        type: { required: true, type: String },
        read: { default: false, type: Boolean },
        hidden: { default: false, type: Boolean },
        form: { required: true, type: String },
        rows: { default: 10 },
        radioButtons: { default: () => [], type: Array },
    },

    data() {
        return {
            state: {
                value: undefined,
            },
        };
    },

    methods: {
        update() {
            const form = this.$store.state.forms[this.form];
            if (form.update) {
                this.state.value = Utils.find_value_with_path(form.content, this.name.split('.'));
            } else {
                this.state.value = undefined;
            }
        },
    },

    watch: {
        reclaim(n) {
            if (n) {
                this.$store.commit(Messages.RECLAIM_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: this.state.value,
                });
            }
        },
        cancel(n) {
            if (n) {
                this.state.value = undefined;
            }
        },
    },
};
