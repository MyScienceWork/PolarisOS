const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');

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
                    },
                },
                paths: {
                    creations: {
                        mail_template: APIRoutes.entity('mail_template', 'POST'),
                    },
                    reads: {
                        mail_template: APIRoutes.entity('mail_template', 'POST', true),
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
    },
    computed: {
    },
};
