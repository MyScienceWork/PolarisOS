const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const Messages = require('../../../common/api/messages');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('entity', 'POST'),
                rpath: APIRoutes.entity('entity', 'GET'),
                itemsPerPage: 20,
                itemsPerRow: 2,
                selected_types: {},
                forms: {
                    csink: 'entity_creation',
                    rsink: 'entity_read',
                    rpipeline: 'pipeline_read',
                    rform: 'form_read',
                },
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.forms.rsink,
            path: this.state.rpath,
        });

        this.$store.dispatch('search', {
            form: this.state.forms.rpipeline,
            path: APIRoutes.entity('pipeline', 'POST', true),
            body: {
                projection: ['name'],
                size: 10000,
            },
        });

        this.$store.dispatch('search', {
            form: this.state.forms.rform,
            path: APIRoutes.entity('form', 'POST', true),
            body: {
                projection: ['name'],
                size: 10000,
            },
        });
    },
    computed: {
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        forms() {
            const fname = this.state.forms.rform;
            return this.mcontent(fname);
        },
        pipelines() {
            const fname = this.state.forms.rpipeline;
            return this.mcontent(fname);
        },
    },
};
