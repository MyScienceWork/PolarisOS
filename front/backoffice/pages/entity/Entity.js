const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('entity', 'POST'),
                rpath: APIRoutes.entity('entity', 'GET'),
                cform: 'entity_creation',
                rform: 'entity_read',
                itemsPerPage: 20,
                itemsPerRow: 2,
                selected_types: {},
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.rform,
            path: this.state.rpath,
        });

        this.$store.dispatch('search', {
            form: 'pipeline_read',
            path: APIRoutes.entity('pipeline', 'POST', true),
            body: {
                projection: ['name'],
                size: 10000,
            },
        });

        this.$store.dispatch('search', {
            form: 'form_read',
            path: APIRoutes.entity('form', 'POST', true),
            body: {
                projection: ['name'],
                size: 10000,
            },
        });
    },
    computed: {
        content() {
            if (this.state.rform in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform];
                const content = form.content || [];
                return content;
            }
            return [];
        },
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        forms() {
            const fname = 'form_read';
            if (fname in this.$store.state.forms) {
                const form = this.$store.state.forms[fname];
                const content = form.content || [];
                return content;
            }
            return [];
        },
        pipelines() {
            const fname = 'pipeline_read';
            if (fname in this.$store.state.forms) {
                const form = this.$store.state.forms[fname];
                const content = form.content || [];
                return content;
            }
            return [];
        },
    },
};
