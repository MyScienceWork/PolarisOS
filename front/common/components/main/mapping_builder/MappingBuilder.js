const moment = require('moment');
const _ = require('lodash');
const LangMixin = require('../../../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    props: {
        mappingName: { type: String, required: true },
        mapping: { type: Object },
    },
    data() {
        return {
            state: {
                mapping: this.mapping || this.default_mapping(),
            },
        };
    },
    methods: {
        default_mapping() {
            return {
                mappings: {
                    [this.mappingName]: {
                        dynamic: 'strict',
                        dynamic_date_formats: [],
                        properties: {},
                    },
                },
            };
        },
        add_child() {
            const children = this.state.mapping.mappings[this.mappingName].properties;
            children[`__field_name_${+moment()}__`] = {
                type: 'keyword',
            };
            this.$forceUpdate();
        },
        remove_child(name) {
            const children = this.state.mapping.mappings[this.mappingName].properties || {};
            if (name in children) {
                console.log('removing child', name);
                delete children[name];
                this.$forceUpdate();
            }
        },
        generate() {
            const children = _.reduce(this.$refs, (obj, value, name) => {
                if (name.startsWith('item_')) {
                    obj[name] = value instanceof Array ? value[0] : value;
                }
                return obj;
            }, {});

            const subobj = _.reduce(children, (obj, value) =>
                    _.merge(obj, value.generate()), {});

            const mapping = {
                mappings: {
                    [this.mappingName]: {
                        dynamic: 'strict',
                        dynamic_date_formats: [],
                        properties: subobj,
                    },
                },
            };
            console.log(mapping);
            this.$emit('update:mapping', mapping);
        },
    },
};
