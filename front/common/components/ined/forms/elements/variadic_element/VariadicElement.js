const _ = require('lodash');
const Messages = require('../../../../../api/messages');
const Utils = require('../../../../../utils/utils');
const InputMixin = require('../../mixins/InputMixin');

module.exports = {
    mixins: [InputMixin],
    props: {
        name: { required: true, type: String },
              // form: { required: true, type: String }, //InputMixin
        array: { type: Boolean, default: true },
        isRequired: { type: Boolean, default: true },
        tabs: { type: Boolean, default: false },
        single: { type: Boolean, default: false },
    },


    data() {
        return {
            state: {
                elements: [],
                tab_active: this.isRequired ? 0 : -1,
            },
        };
    },

    methods: {
        activate_tab(id, e) {
            e.preventDefault();
            this.state.tab_active = id;
        },
        add(e) {
            e.preventDefault();
            this.state.elements.push(true);
        },
        remove(id, e) {
            e.preventDefault();
            this.state.elements.splice(id, 1, false);
        },
        initialize() {
            const form = this.$store.state.forms[this.form];
            const object = Utils.find_value_with_path(form.content, this.name.split('.'));
            if (object instanceof Array) {
                this.state.elements = object.map(() => true);
            } else {
                this.state.elements = _.map(object, () => true);
            }

            if (this.state.elements.length === 0) {
                if (this.single || this.isRequired) {
                    this.state.elements = [true];
                } else {
                    this.state.elements = [];
                }
            }
        },
    },

    mounted() {
        this.initialize();
    },

    computed: {
        current_state() {
            return this.fstate(this.form);
        },
    },

    watch: {
        current_state(s) {
            this.dispatch(s, this);
        },
    },
};
