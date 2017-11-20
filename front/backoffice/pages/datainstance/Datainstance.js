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
                path: APIRoutes.entity(this.entity(), 'POST'),
                rpath: APIRoutes.entity(this.entity(), 'POST', true),
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
        entity() {
            const instance = this.$route.params.datainstance;
            const config = this.$store.state.global_config;
            if (instance.startsWith(config.datasources.prefix)) {
                return 'datainstance';
            } else if (instance.startsWith(config.keystores.prefix)) {
                return 'keystore';
            }
            return instance;
        },
        search_body() {
            const instance = this.$route.params.datainstance;
            if (this.entity() === 'datainstance' || this.entity() === 'keystore') {
                return {
                    size: 10000,
                    where: {
                        type: instance,
                    },
                };
            }
            return {
                size: 10000,
            };
        },
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.rform,
            path: this.state.rpath,
            body: this.search_body(),
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
    },
};
