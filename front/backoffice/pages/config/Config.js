const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const Environments = require('../../lists/environments');
const Langs = require('../../lists/langs');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormCleanerMixin, ESQueryMixin],
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        config: 'config_creation',
                        search: 'config_creation_search',
                    },
                    reads: {
                        config: 'config_read',
                        role: 'role_read',
                    },
                },
                paths: {
                    creations: {
                        config: APIRoutes.entity('config', 'POST'),
                    },
                    reads: {
                        config: APIRoutes.entity('config', 'POST', true),
                        role: APIRoutes.entity('role', 'POST', true),
                    },
                },
                es_query_id: 'backoffice-config-query',
                langs: Langs.LangsList,
                environments: Environments,
                need_ide: false,
            },
        };
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.role,
            path: this.state.paths.reads.role,
            body: {
                size: 10000,
                projection: ['name'],
            },
        });
    },
    computed: {
        roles() {
            return this.mcontent(this.state.sinks.reads.role);
        },
    },
};
