const _ = require('lodash');
const Messages = require('../../../../../../../api/messages');
const Utils = require('../../../../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');

module.exports = {
    mixins: [InputMixin],
    props: {
        name: { required: true, type: String },
        form: { required: true, type: String },
        array: { type: Boolean, default: true },
        isRequired: { type: Boolean, default: true },
    },

    data() {
        return {
            state: {
                elements: [],
            },
        };
    },

    methods: {
        add(e) {
            e.preventDefault();
            this.state.elements.push(true);
        },
        remove(id, e) {
            console.log(id);
            e.preventDefault();
            this.state.elements.splice(id, 1, false);
        },
        update() {
            const form = this.$store.state.forms[this.form];
            if (form.update) {
                const object = Utils.find_value_with_path(form.content, this.name.split('.'));
                if (object instanceof Array) {
                    this.state.elements = object.map(() => true);
                } else {
                    this.state.elements = _.map(object, () => true);
                }
            } else {
                this.state.elements = this.isRequired ? [true] : [];
            }
        },
    },

    computed: {
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
