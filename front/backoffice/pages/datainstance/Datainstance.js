const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity(this.$route.params.datainstance, 'POST'),
                rpath: APIRoutes.entity(this.$route.params.datainstance, 'GET'),
                cform: `${this.$route.params.datainstance}_creation`,
                rform: `${this.$route.params.datainstance}_read`,
                itemsPerPage: 20,
                itemsPerRow: 2,
                forms: {
                    name: `${this.$route.params.datainstance}_form`,
                    fname: this.$route.params.datainstance,
                },
            },
        };
    },
    methods: {
    },
    mounted() {
        const config = this.$store.state.global_config;
        const instance = this.$route.param.datainstance;
        if (instance.startsWith(config.datasources.prefix)) {
            this.state.rpath = APIRoutes.entity('datainstance', 'POST', true);
            this.state.path = APIRoutes.entity('datainstance', 'POST');
            this.$store.dispatch('single_read', {
                form: this.state.rform,
                path: this.state.rpath,
            });
        } else if (instance.startsWith(config.keystores.prefix)) {
            this.state.rpath = APIRoutes.entity('keystore', 'POST', true);
            this.state.path = APIRoutes.entity('keystore', 'POST');
            this.$store.dispatch('search', {
                form: this.state.rform,
                path: this.state.rpath,
                body: {
                    size: 10000,
                    where: {
                        type: instance,
                    },
                },
            });
        } else {
            this.$store.dispatch('search', {
                form: this.state.rform,
                path: this.state.rpath,
                body: {
                    size: 10000,
                    where: {
                        type: instance,
                    },
                },
            });
        }
    },
    computed: {
        content() {
            if (this.state.rform in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform];
                const content = form.content || [];
                return content.map((c) => {
                    c.label = this.lang(c.label);
                    return c;
                });
            }
            return [];
        },
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
    },
};
