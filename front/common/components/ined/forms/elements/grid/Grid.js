const _ = require('lodash');
const VueGridLayout = require('vue-grid-layout');
const Draggable = require('vuedraggable');
const LangMixin = require('../../../../../mixins/LangMixin');
const FormMixin = require('../../../../../mixins/FormMixin');
const Subpage = require('./Subpage.vue');

const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;


module.exports = {
    mixins: [LangMixin/* , FormMixin*/],
    components: {
        GridLayout,
        GridItem,
        Draggable,
        Subpage,
    },

    data() {
        return {
            state: {
                isWidgetModelActive: false,
                minW: 2,
                colNum: 12,
                rows: [],
                elements: [],
                row_constraints: {

                },
            },
        };
    },
    methods: {
        find_ideal_place(row) {
            const widgets = this.state.elements.filter(elt => elt.row === row);
            widgets.sort((w1, w2) => w1.x - w2.x);
            let filled = _.range(this.state.colNum).reduce((acc, elt) => {
                acc.push(false);
                return acc;
            }, []);

            filled = widgets.reduce((f, widget) => {
                for (const i of _.range(widget.x, widget.x + widget.w)) {
                    f[i] = true;
                }
                return f;
            }, filled);

            console.log(filled);

            let k = 0;
            let j = 0;
            for (const i in filled) {
                if (filled[i] === true) {
                    j = i;
                    k = 1;
                    continue;
                }

                if (filled[i] === filled[j]) {
                    k += 1;
                }

                if (k === this.state.minW) {
                    return i - k + 1;
                }

                if (filled[i] !== filled[j]) {
                    k = 1;
                }

                j = i;
            }

            return -1;
        },
        add_row(e) {
            e.preventDefault();
            const pos = this.state.rows.length;

            this.state.rows.push({
                i: `${pos}`,
            });
            this.state.row_constraints[`${pos}`] = {
                total: 0,
            };
        },
        remove_row(row, e) {
            e.preventDefault();
            this.state.rows = this.state.rows.filter(r => r.i !== row);
            this.state.elements = this.state.elements.filter(elt => elt.row !== row);
        },
        add_widget(row, e) {
            e.preventDefault();
            const constraints = this.state.row_constraints[row];
            const left = this.state.colNum - constraints.total;
            if (left < this.state.minW) {
                return;
            }

            const x = this.find_ideal_place(row);
            if (x === -1) {
                return;
            }

            this.state.elements.push({
                x,
                y: 0,
                w: this.state.minW,
                h: 1,
                row,
                i: `${this.state.elements.length}`,
            });

            constraints.total += this.state.minW;
        },
        remove_widget(w, e) {
            e.preventDefault();
            const _widget = this.state.elements.filter(elt => elt.i === w);
            if (_widget.length === 0) {
                return;
            }

            const widget = _widget[0];
            this.state.row_constraints[widget.row].total -= widget.w;
            this.state.elements = this.state.elements.filter(elt => elt.i !== w);
        },
        edit_widget(w, e) {
            e.preventDefault();
            this.state.isWidgetModelActive = true;
            console.log('edit', w);
        },
        grid_resized_event(i, newH, newW) {
            const _widget = this.state.elements.filter(elt => elt.i === i);
            if (_widget.length === 0) {
                return;
            }

            const widget = _widget[0];
            const row = widget.row;
            const total = this.state.elements.reduce((sum, elt) => {
                if (elt.row !== row) {
                    return sum;
                }

                sum += elt.w;
                return sum;
            }, 0);
            this.state.row_constraints[row].total = total;
        },
        grid_moved_event(i, newX, newY) {

        },
    },
};
