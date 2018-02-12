const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin],
    data() {
        return {
            state: {
                paths: {
                    creations: {
                        [this.entity()]: APIRoutes.entity(this.entity(), 'POST'),
                    },
                    reads: {
                        [this.entity()]: APIRoutes.entity(this.entity(), 'GET'),
                        entity: APIRoutes.entity('entity', 'POST', true),
                    },
                },
                sinks: {
                    reads: {
                        [this.entity()]: 'datainstance_read',
                        entity: 'entity_read',
                        form: 'datainstance_form',
                    },
                    creations: {
                        [this.entity()]: 'datainstance_creation',
                    },
                },
                itemsPerPage: 20,
                itemsPerRow: 2,
            },
        };
    },
    methods: {
        entity() {
            const instance = this.$route.params.datainstance;
            return instance;
        },
        search_body() {
            return {
                size: 10000,
            };
        },
        show_success_read(form) {
            if (form !== this.state.sinks.reads.entity) {
                return;
            }

            const content = this.content_entity;
            if (content.length > 0) {
                this.fetch_form(content[0].form, this.state.sinks.reads.form);
            }
        },
    },
    mounted() {
        Object.keys(this.state.sinks.reads).forEach((sink) => {
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.reads[sink],
                keepContent: false,
            });
        });

        this.$store.state.requests.push({
            name: 'single_read',
            content: {
                form: this.state.sinks.reads[this.entity()],
                path: this.state.paths.reads[this.entity()],
            },
        });

        this.$store.state.requests.push({
            name: 'search',
            content: {
                form: this.state.sinks.reads.entity,
                path: this.state.paths.reads.entity,
                body: {
                    where: {
                        type: this.entity(),
                    },
                },
            },
        });
    },
    watch: {
        error_datainstance(n) {
            return this.mwerror(this.state.sinks.reads[this.entity()])(n);
        },
        current_read_state_datainstance(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads[this.entity()])(s);
        },
        current_read_state_entity(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.entity)(s);
        },
    },
    computed: {
        content_datainstance() {
            const content = this.mcontent(this.state.sinks.reads[this.entity()]);
            return content;
        },
        length_datainstance() {
            return this.mlength(this.state.sinks.reads[this.entity()]);
        },
        read_content_datainstance() {
            const content = this.content_datainstance;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_datainstance() {
            return this.merror(this.state.sinks.reads[this.entity()]);
        },
        current_read_state_datainstance() {
            return this.mcurrent_read_state(this.state.sinks.reads[this.entity()]);
        },

        current_read_state_entity() {
            return this.mcurrent_read_state(this.state.sinks.reads.entity);
        },
        content_entity() {
            const content = this.mcontent(this.state.sinks.reads.entity);
            return content;
        },
    },
};
