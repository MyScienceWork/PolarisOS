const VueColor = require('vue-color');
const VueClickAway = require('vue-clickaway');
const InputMixin = require('../../mixins/InputMixin');
const Utils = require('../../../../utils/utils');
const Messages = require('../../../../api/messages');

module.exports = {
    props: {
        name: { required: true, type: String },
        label: { required: true, type: String },
        isRequired: { default: false, type: Boolean },
        form: { required: true, type: String },
    },
    components: {
        'sketch-picker': VueColor.Sketch,
    },
    directives: {
        onClickAway: VueClickAway.directive,
    },
    mixins: [InputMixin],
    data() {
        return {
            state: {
                color: { hex: '#FFF' },
                show: false,
            },
        };
    },
    methods: {
        away() {
            this.state.show = false;
        },
        update() {
            const form = this.$store.state.forms[this.form];
            if (form.update) {
                this.state.color.hex = Utils.find_value_with_path(form.content, this.name.split('.'));
            }
        },
    },
    watch: {
        reclaim(n) {
            if (n) {
                this.$store.commit(Messages.RECLAIM_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: this.state.color.hex,
                });
            }
        },
        cancel(n) {
            if (n) {
                this.state.color = { hex: '#FFF' };
            }
        },
    },
};
