const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const Messages = require('../../../common/api/messages');


module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                itemsPerPage: 30,
                itemsPerRow: 1,
                paths: {
                    creations: {
                        menu: APIRoutes.entity('menu', 'POST'),
                    },
                    reads: {
                        menu: APIRoutes.entity('menu', 'GET'),
                        page: APIRoutes.entity('page', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        menu: 'menu_read',
                        page: 'page_read',
                    },
                    creations: {
                        menu: 'menu_creation',
                    },
                },
            },
        };
    },
    methods: {
    },
    mounted() {
        Object.keys(this.state.sinks.reads).forEach((sink) => {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads[sink],
                keepContent: false,
            });
        });

        Object.keys(this.state.sinks.reads).forEach((sink) => {
            this.$store.state.requests.push({
                name: 'single_read',
                content: {
                    form: this.state.sinks.reads[sink],
                    path: this.state.paths.reads[sink],
                },
            });
        });
    },
    watch: {
        error_menu(n) {
            return this.mwerror(this.state.sinks.reads.menu)(n);
        },
        current_read_state_menu(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.menu)(s);
        },
        error_page(n) {
            return this.mwerror(this.state.sinks.reads.page)(n);
        },
        current_read_state_page(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.page)(s);
        },
    },
    computed: {
        content_menu() {
            const content = this.mcontent(this.state.sinks.reads.menu);
            return content;
        },
        length_menu() {
            return this.mlength(this.state.sinks.reads.menu);
        },
        read_content_menu() {
            const content = this.content_menu;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_menu() {
            return this.merror(this.state.sinks.reads.menu);
        },
        current_read_state_menu() {
            return this.mcurrent_read_state(this.state.sinks.reads.menu);
        },

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
    },
};
