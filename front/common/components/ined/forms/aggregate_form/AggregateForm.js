const Messages = require('../../../../api/messages');
const APIRoutes = require('../../../../api/routes');
const Utils = require('../../../../utils/utils');

const FormMixin = require('../../../../mixins/FormMixin');
const FormCleanerMixin = require('../../../../mixins/FormCleanerMixin');
const LangMixin = require('../../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    props: {
        selectPlaceholder: { default: 'l_select_content', type: String },
        label: { default: '', type: String },
        placeholder: { default: '', type: String },
        // specs: { required: true, type: Object },
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        aggregate: 'aggregate_read',
                        dummy: 'dummy_form',
                    },
                    reads: {},
                },
                inputs: {},
            },
        };
    },
    methods: {
        select(val, id) {
            if (val == null) {
                if (id in this.state.inputs) {
                    delete this.state.inputs[id];
                }
                return;
            }

            this.state.sinks.reads[val.value] = `${val.value}_read`;

            this.state.inputs = Object.assign({}, this.state.inputs, { [id]: {
                element: this.specs[val.value].element,
                name: `content.${id}.${val.value}`,
                selected: val,
                sink: this.state.sinks.reads[val.value],
            } });
        },
        select_component(id) {
            if (!(id in this.state.inputs)
                || this.state.inputs[id].element === 'text') {
                return 'finput';
            }
            return 'fselect';
        },
    },
    watch: {
    },
    computed: {
        specs() {
            return {
                'title.content': {
                    element: 'text',
                    label: 'l_title',
                    value: 'title.content',
                },
                'abstracts.content': {
                    element: 'text',
                    label: 'l_abstract',
                    value: 'abstracts.content',
                },
                'authors._id': {
                    entity: {
                        name: 'author',
                        label: 'fullname',
                        value: '_id',
                    },
                    element: 'multi-select',
                    label: 'l_author',
                    value: 'authors._id',
                },
                'diffusion.research_team': {
                    entity: {
                        name: 'laboratory',
                        label: 'name',
                        value: '_id',
                    },
                    element: 'multi-select',
                    label: 'l_laboratory',
                    value: 'diffusion.research_team',
                },
            };
        },
        options() {
            return Object.keys(this.specs).map((k) => {
                const object = this.specs[k];
                return { label: object.label, value: k };
            });
        },
        information(sink) {
            const content = this.fcontent(sink);

            if (content instanceof Array) {
                if (content.length === 0) {

                }
            }
        },
    },
    beforeMount() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.creations.aggregate,
            keep_content: false,
        });
    },
};
