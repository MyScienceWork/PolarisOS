const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity('user', 'POST'),
                rpath: APIRoutes.entity('user', 'GET'),
                forms: {
                    csink: 'user_creation',
                    rsink: 'user_read',
                    rsink_roles: 'role_read',
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
            form: this.state.forms.rsink_roles,
            path: APIRoutes.entity('role', 'POST', true),
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
        roles() {
            const content = this.mcontent(this.state.forms.rsink_roles);
            return content.map((c) => {
                c.name = this.lang(c.name);
                return c;
            });
        },
    },
};
