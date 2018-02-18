const _ = require('lodash');
const Draggable = require('vuedraggable');
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
        draggable: { type: Boolean, default: false },
        single: { type: Boolean, default: false },
    },

    components: {
        Draggable,
    },

    data() {
        return {
            state: {
                elements: [],
                tab_active: this.isRequired || this.single ? 0 : -1,
                total: this.isRequired || this.single ? 1 : 0,
            },
        };
    },

    methods: {
        activate_tab(id, e) {
            e.preventDefault();
            this.state.tab_active = id;
        },
        add() {
            this.state.elements.push({ i: this.state.elements.length, a: true });
            this.state.total += 1;
        },
        remove(id) {
            if ((this.isRequired || this.single) && this.state.total === 1) {
                return;
            }

            const real_idx = _.findIndex(this.state.elements, o => o.i === id);
            if (real_idx === -1) {
                return;
            }
            this.state.elements[real_idx].a = false;
            this.state.total -= 1;
        },
        initialize() {
            const form = this.$store.state.forms[this.form];
            const object = Utils.find_value_with_path(form.content, this.name.split('.'));
            if (object != null) {
                if (object instanceof Array) {
                    this.state.elements = object.map((o, i) => ({ i, a: true }));
                    this.state.total = this.state.elements.length;
                } else if (object instanceof Object) {
                    this.state.elements = Object.keys(object).map((o, i) => ({ i, a: true }));
                    this.state.total = this.state.elements.length;
                }
            } else if (this.single || this.isRequired) {
                this.state = Object.assign({}, { elements: [{ a: true, i: 0 }], tab_active: 0, total: 1 });
            } else {
                this.state = Object.assign({}, { elements: [], tab_active: -1, total: 0 });
            }
        },
        start_collection(sink) {
            const active_elements = this.state.elements.filter(e => e.a);
            if (active_elements.length === 0) {
                this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: [],
                });
            }
        },
    },

    mounted() {
        this.initialize(this.form);
    },

    computed: {
        current_state() {
            return this.fstate(this.form);
        },
    },

    watch: {
        current_state(s) {
            this.dispatch(s, this, this.form);
        },
    },
};
