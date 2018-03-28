const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const APIRoutes = require('../../../common/api/routes');
const Auth = require('../../../common/utils/auth');
const Queries = require('../../../common/specs/queries');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');

const LastDeposits = require('../home/subcomponents/LastDeposits.vue');
const SearchBar = require('../browse/subcomponents/SearchBar.vue');
const SearchResults = require('../browse/subcomponents/SearchResults.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    components: {
        LastDeposits,
        SearchResults,
        SearchBar,
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        user: 'user_profile_creation',
                        deposit_search: 'user_profile_deposit_creation',
                        publication_search: 'user_profile_publication_creation',
                    },
                    reads: {
                        user: 'user_profile_read',
                        publication: 'user_publication_read',
                        deposit: 'user_deposit_read',
                    },
                },
                paths: {
                    creations: {
                        user: APIRoutes.entity('my_user', 'POST'),
                    },
                    reads: {
                        user: APIRoutes.entity('user', 'POST', true),
                        author: APIRoutes.entity('author', 'POST', true),
                        publication: APIRoutes.entity('publication', 'POST', true),
                    },
                },
                current_tab: 0,
                loggedIn: true,
                last_deposits_number: 10,
                author_mode: false,
            },
        };
    },
    methods: {
        update_tab(idx) {
            this.state.current_tab = idx;
        },
        switch_tab(t) {
            try {
                this.state.current_tab = Math.min(Math.max(0, parseInt(t, 10)), 3);
            } catch (err) {
                // noop
            }
        },
    },
    watch: {
        query(q) {
            if (this.state.loggedIn && 't' in q) {
                this.switch_tab(q.t);
            } else {
                this.switch_tab(0);
            }
        },
    },
    computed: {
        hasAddress() {
            return this.author && this.author.address && this.author.address.address;
        },
        hasExternal() {
            return this.author && this.author.external && Object.keys(this.author.external).filter(k => this.author.external[k]).length > 0;
        },
        user() {
            if (this.state.author_mode) {
                const content = this.fcontent(this.state.sinks.reads.user);
                if (content instanceof Array && content.length > 0) {
                    return { author: content[0],
                        firstName: content[0].firstName,
                        lastName: content[0].lastName,
                        fullName: content[0].fullName };
                }
                return {};
            }
            const content = this.fcontent(this.state.sinks.reads.user);
            if (content instanceof Array && content.length > 0) {
                const c = content[0];
                c.firstName = c.firstname;
                c.lastName = c.lastname;
                c.fullName = c.fullname;
                return c;
            }
            return {};
        },
        author() {
            if (this.user.author) {
                return this.user.author;
            }
            return null;
        },
        publications() {
            const content = this.fcontent(this.state.sinks.reads.publication);
            if (content instanceof Array) {
                return content;
            }
            return content;
        },
        loggedIn() {
            return this.state.loggedIn;
        },
        query() {
            return this.$route.query;
        },
        search_param_in_query() {
            return this.$route.query && this.$route.query.s ? this.$route.query.s.trim() : '';
        },
        default_search_publications_query() {
            if (this.author && this.author.id) {
                return JSON.stringify(Queries.author_search(`${this.author.id}`));
            }
            return JSON.stringify({});
        },
        search_publications_query() {
            if (this.author && this.author.id) {
                return JSON.stringify(Queries.publication_search_with_author(`${this.author.id}`));
            }
            return JSON.stringify({});
        },
    },
    beforeMount() {
        this.state.author_mode = this.$route.matched[0].path === '/a/:id/profile';
    },
    mounted() {
        if (this.state.author_mode) {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads.user,
                path: this.state.paths.reads.author,
                body: {
                    where: {
                        id: this.$route.params.id,
                    },
                    size: 1,
                },
            });
        } else {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads.user,
                path: this.state.paths.reads.user,
                body: {
                    where: {
                        'authentication.key': this.$route.params.id,
                    },
                    size: 1,
                    population: ['author'],
                },
            });
        }

        Auth.loggedIn('my_user', ['r', 'u']).then((ok) => {
            this.state.loggedIn = ok && Auth.user_id() === this.$route.params.id;
            if (this.state.loggedIn && this.$route.query.t) {
                this.switch_tab(this.$route.query.t);
            }
        }).catch(err => console.error(err));
    },
};
