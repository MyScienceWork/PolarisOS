const FormMixin = require('../../../../../common/mixins/FormMixin');
const APIRoutes = require('../../../../../common/api/routes');

module.exports = {
    mixins: [FormMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        typology_color: 'typology_color_read',
                    },
                },
                paths: {
                    reads: {
                        typology_color: APIRoutes.entity('typology', 'POST', true),
                    },
                },
            },
        };
    },
    methods: {
        get_color(type) {
            return this.typology[type] ? this.typology[type].color : '#FFF';
        },
    },
    computed: {
        typology() {
            const content = this.fcontent(this.state.sinks.reads.typology_color);

            if (!(content instanceof Array)) {
                return {};
            }

            return content.reduce((obj, type) => {
                obj[type._id] = {
                    color: type.color,
                    name: type.name,
                };
                return obj;
            }, {});
        },
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.typology_color,
            path: this.state.paths.reads.typology_color,
            body: {
                size: 10000,
                projection: ['color', 'name'],
            },
        });
    },
};
