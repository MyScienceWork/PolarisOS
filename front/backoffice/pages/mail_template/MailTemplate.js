const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const TypesList = require('../../../common/lists/valtypes');
const EntitiesList = require('../../../common/lists/entities');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        mail_template: 'mail_template_creation',
                        search: 'search_creation_mail_template',
                    },
                    reads: {
                        mail_template: 'mail_template_read',
                        entity: 'entities_read',
                    },
                },
                paths: {
                    creations: {
                        mail_template: APIRoutes.entity('mail_template', 'POST'),
                    },
                    reads: {
                        mail_template: APIRoutes.entity('mail_template', 'POST', true),
                        entity: APIRoutes.entity('entity', 'POST', true),
                    },
                },
                es_query_id: 'backoffice-mail-template-query',
                need_ide: false,
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.entity,
            path: this.state.paths.reads.entity,
            body: {
                size: 10000,
            },
        });
    },
    computed: {
        entities() {
            const content = this.fcontent(this.state.sinks.reads.entity);
            if (content instanceof Array) {
                return content.concat(EntitiesList);
            }
            return [];
        },
        types() {
            return TypesList;
        },
    },
};
