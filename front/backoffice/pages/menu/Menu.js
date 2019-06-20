const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const Messages = require('../../../common/api/messages');


module.exports = {
    mixins: [ReaderMixin, LangMixin, ESQueryMixin, FormCleanerMixin],
    data() {
        return {
            state: {
                paths: {
                    creations: {
                        menu: APIRoutes.entity('menu', 'POST'),
                    },
                    reads: {
                        menu: APIRoutes.entity('menu', 'POST', true),
                        page: APIRoutes.entity('page', 'GET'),
                        role: APIRoutes.entity('role', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        menu: 'menu_read',
                        page: 'page_read',
                        role: 'role_read',
                    },
                    creations: {
                        menu: 'menu_creation',
                        search: 'search_creation_menu',
                    },
                },
                es_query_id: 'backoffice-menu-query',
            },
        };
    },
    methods: {
    },
    mounted() {
        ['page'].forEach((sink) => {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads[sink],
                keep_content: false,
            });
        });

        ['page'].forEach((sink) => {
            this.$store.state.requests.push({
                name: 'single_read',
                content: {
                    form: this.state.sinks.reads[sink],
                    path: this.state.paths.reads[sink],
                },
            });
        });
        this.$store.state.requests = ['role'].map(e => ({
            name: 'search',
            type: 'dispatch',
            content: {
                form: this.state.sinks.reads[e],
                path: this.state.paths.reads[e],
                body: {
                    size: 10000,
                },
            },
        }));
    },
    watch: {
        error_page(n) {
            return this.mwerror(this.state.sinks.reads.page)(n);
        },
        current_read_state_page(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.page)(s);
        },
    },
    computed: {
        content_page() {
            const content = this.mcontent(this.state.sinks.reads.page);
            return content;
        },
        length_page() {
            return this.mlength(this.state.sinks.reads.page);
        },
        error_page() {
            return this.merror(this.state.sinks.reads.page);
        },
        current_read_state_page() {
            return this.mcurrent_read_state(this.state.sinks.reads.page);
        },
        roles() {
            const content = this.mcontent(this.state.sinks.reads.role);
            return content;
        },
    },
};
