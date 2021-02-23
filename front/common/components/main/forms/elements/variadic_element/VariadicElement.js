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
        useIcons: { type: Boolean, default: true },
        tabs: { type: Boolean, default: false },
        draggable: { type: Boolean, default: false },
        single: { type: Boolean, default: false },
        defaultSize: { type: Number, default: 0 },
        readonly: { type: Boolean, default: false },
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
        remove(id, order) {
            if ((this.isRequired || this.single) && this.state.total === 1) {
                return;
            }

            const real_idx = _.findIndex(this.state.elements, o => o.i === id);
            if (real_idx === -1) {
                return;
            }
            this.state.elements[real_idx].a = false;
            this.state.elements = this.state.elements.filter(e => e.a);
            this.state.total = this.state.elements.length;

            this.$store.commit(Messages.REMOVE_FORM_ELEMENT, {
                form: this.form,
                name: `${this.name}.${order}`,
            });
            // Re-number elements
            this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                form: this.form,
                name: this.name,
                info: undefined,
                renumbering: true,
            });
        },
        initialize(sink) {
            if (sink !== this.form) {
                return;
            }

            const form = this.$store.state.forms[this.form];
            let object = null;

            if (form && 'content' in form) {
                object = Utils.find_value_with_path(form.content, this.name.split('.'));
            }

            console.log('initialize ve,', sink, object);

            if (object != null) {
                if (object instanceof Array && object.length > 0) {
                    this.state.elements = object.map((o, i) => ({ i, a: true }));
                    this.state.total = this.state.elements.length;
                } else if (object instanceof Object && Object.keys(object).length > 0) {
                    this.state.elements = Object.keys(object).map((o, i) => ({ i, a: true }));
                    this.state.total = this.state.elements.length;
                } else if (this.single || this.isRequired || this.defaultSize > 0) {
                    if (this.defaultSize > 0) {
                        const elements = _.range(this.defaultSize).map(i => ({ a: true, i }));
                        this.state = Object.assign({}, { elements, tab_active: 0, total: elements.length });
                    } else {
                        this.state = Object.assign({}, { elements: [{ a: true, i: 0 }], tab_active: 0, total: 1 });
                    }
                }
            } else if (this.single || this.isRequired || this.defaultSize > 0) {
                if (this.defaultSize > 0) {
                    const elements = _.range(this.defaultSize).map(i => ({ a: true, i }));
                    this.state = Object.assign({}, { elements, tab_active: 0, total: elements.length });
                } else {
                    this.state = Object.assign({}, { elements: [{ a: true, i: 0 }], tab_active: 0, total: 1 });
                }
                if (this.mutation_state === 'initial') {
                    this.update();
                }
            } else {
                this.state = Object.assign({}, { elements: [], tab_active: -1, total: 0 });
                if (this.mutation_state === 'initial') {
                    this.update();
                }
            }
        },
        update(id) {
            if (id != null) {
                this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                    form: this.form,
                    name: `${this.name}.${id}`,
                    info: undefined,
                });
            } else if (this.state.elements.length === 0) {
                this.$store.commit(Messages.COMPLETE_FORM_ELEMENT, {
                    form: this.form,
                    name: this.name,
                    info: {},
                });
            }
        },
    },

    mounted() {
        this.initialize(this.form);
    },

    computed: {
        mutation_state() {
            const form = this.$store.state.forms[this.form];
            if (form == null) {
                return 'initial';
            }
            return form.state;
        },
    },

    watch: {
        mutation_state(ns) {
            if (ns === 'update') {
                this.fcontent(this.form);
                this.initialize(this.form);
            } else if (ns === 'initial') {
                this.initialize(this.form);
            }
        },
    },
};
