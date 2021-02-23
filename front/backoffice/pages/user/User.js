const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const ESQueryMixin = require('../../../common/mixins/ESQueryMixin');
const Langs = require('../../lists/langs');

module.exports = {
    mixins: [ReaderMixin, LangMixin, ESQueryMixin, FormCleanerMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                        user: APIRoutes.entity('user', 'POST', true),
                        author: APIRoutes.entity('author', 'POST', true),
                        role: APIRoutes.entity('role', 'POST', true),
                        country: APIRoutes.entity('country', 'POST', true),
                    },
                    creations: {
                        user: APIRoutes.entity('user', 'POST'),
                    },
                },
                sinks: {
                    reads: {
                        role: 'role_read',
                        user: 'user_read',
                        // author: 'author_read',
                        country: 'country_read',
                    },
                    creations: {
                        search: 'search_creation_user',
                        user: 'user_creation',
                    },
                },
                es_query_id: 'backoffice-user-query',
            },
        };
    },
    methods: {
        reset_authentication_key(user) {
            delete user.authentication.key;
            return user;
        },
        get_role(role_id) {
            const content = this.mcontent(this.state.sinks.reads.role);
            return content.find(role => role._id === role_id).name;
        },
    },
    mounted() {
        this.$store.state.requests = ['role', 'country'].map(e => ({
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
    computed: {
                  /* authors() {
            const content = this.mcontent(this.state.sinks.reads.author);
            if (content instanceof Array) {
                return content;
            }
            return [];
            },*/
        roles() {
            const content = this.mcontent(this.state.sinks.reads.role);
            return content;
        },
        countries() {
            const content = this.mcontent(this.state.sinks.reads.country);
            return content;
        },
        langs() {
            const langs_in_config = this.$store.state.global_config.langs.map(l => l.value);
            const results = langs_in_config.reduce((arr, code) => {
                arr.push({ label: Langs.Langs[code], value: code });
                return arr;
            }, []);
            return results;
        },
    },
};
