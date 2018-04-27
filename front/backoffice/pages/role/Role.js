const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('role', 'POST'),
                rpath: APIRoutes.entity('role', 'GET'),
                rpath_entities: APIRoutes.entity('entity', 'GET'),
                forms: {
                    csink: 'role_creation',
                    rsink: 'role_read',
                    rsink_entities: 'entity_read',
                },
                itemsPerPage: 20,
                itemsPerRow: 2,
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
            form: this.state.forms.rsink_entities,
            path: APIRoutes.entity('entity', 'POST', true),
            body: {
                projection: ['type'],
                size: 10000,
            },
        });
    },
    computed: {
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
        entities() {
            const content = this.mcontent(this.state.forms.rsink_entities);
            content.sort((a, b) => (a.type > b.type) - (a.type < b.type));
            // TODO make this WAY cleaner;
            content.push({ type: 'publication' });
            content.push({ type: 'entity' });
            content.push({ type: 'form' });
            content.push({ type: 'pipeline' });
            content.push({ type: 'user' });
            content.push({ type: 'role' });
            content.push({ type: 'function' });
            content.push({ type: 'lang' });
            content.push({ type: 'config' });
            content.push({ type: 'importer' });
            content.push({ type: 'exporter' });
            content.push({ type: 'connector' });
            content.push({ type: 'template' });
            content.push({ type: 'menu' });
            content.push({ type: 'widget' });
            content.push({ type: 'page' });
            content.push({ type: 'overview' });
            content.push({ type: 'my_user' });
            content.push({ type: 'query' });
            content.push({ type: 'mail_template' });

            return content.map((c, i) => {
                c.i = i;
                return c;
            });
        },
    },
};
