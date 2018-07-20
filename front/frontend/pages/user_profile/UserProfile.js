const _ = require('lodash');
const LangMixin = require('../../../common/mixins/LangMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const APIRoutes = require('../../../common/api/routes');
const Auth = require('../../../common/utils/auth');
const Queries = require('../../../common/specs/queries');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const Messages = require('../../../common/api/messages');

const LastDeposits = require('../home/subcomponents/LastDeposits.vue');
const SearchBar = require('../browse/subcomponents/SearchBar.vue');
const SearchResults = require('../browse/subcomponents/SearchResults.vue');
const VueClickAway = require('vue-clickaway');

module.exports = {
    mixins: [UserMixin, LangMixin, FormMixin, FormCleanerMixin],
    components: {
        LastDeposits,
        SearchResults,
        SearchBar,
    },
    directives: {
        onClickAway: VueClickAway.directive,
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        user: 'user_profile_creation',
                        author: 'author_creation',
                        deposit_search: 'user_profile_deposit_creation',
                        publication_search: 'user_profile_publication_creation',
                    },
                    reads: {
                        user: 'user_profile_read',
                        publication: 'user_publication_read',
                        deposit: 'user_deposit_read',
                        user_forms: 'user_forms_read',
                    },
                },
                paths: {
                    creations: {
                        user: APIRoutes.entity('user', 'POST'),
                        author: APIRoutes.entity('author', 'POST'),
                    },
                    reads: {
                        user: APIRoutes.entity('user', 'POST', true),
                        user_forms: APIRoutes.entity('form', 'POST', true),
                        author: APIRoutes.entity('author', 'POST', true),
                        publication: APIRoutes.entity('publication', 'POST', true),
                    },
                },
                statuses: {
                    creations: {
                        user: 'nc',
                        author: 'nc',
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
            const q = _.merge({}, _.cloneDeep(this.query || {}), { t: this.state.current_tab });
            this.$router.push({ query: q });
        },
        switch_tab(t) {
            try {
                this.state.current_tab = Math.min(Math.max(0, parseInt(t, 10)), 3);
            } catch (err) {
                // noop
            }
        },
        show_success_read(sink) {
            if (sink === this.state.sinks.reads.user) {
                const content = this.fcontent(sink);

                let body = {};
                if (content instanceof Array) {
                    body = content.length > 0 ? _.cloneDeep(content[0]) : {};
                } else {
                    body = _.cloneDeep(content);
                }

                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: this.state.sinks.creations.author,
                    body: body.author,
                });

                body.author = '_id' in body.author ? body.author._id : undefined;
                body.roles = body.roles.map(r => ({ _id: r._id._id }));
                this.$store.commit(Messages.TRANSFERT_INTO_FORM, {
                    form: this.state.sinks.creations.user,
                    body,
                });
            }
        },
        show_success(sink) {
            if (sink === this.state.sinks.creations.user) {
                this.state.statuses.creations.user = 'ok';
            } else if (sink === this.state.sinks.creations.author) {
                this.state.statuses.creations.author = 'ok';
            }

            setTimeout(() => {
                this.state.statuses.creations.user = 'nc';
                this.state.statuses.creations.author = 'nc';
            }, 3000);
        },
        show_error(sink) {
            if (sink === this.state.sinks.creations.user) {
                this.state.statuses.creations.user = 'nok';
            } else if (sink === this.state.sinks.creations.author) {
                this.state.statuses.creations.author = 'nok';
            }
            setTimeout(() => {
                this.state.statuses.creations.user = 'nc';
                this.state.statuses.creations.author = 'nc';
            }, 10000);
        },
        save(entity) {
            this.$store.dispatch('update', {
                form: this.state.sinks.creations[entity],
                path: this.state.paths.creations[entity],
                body: this.fcontent(this.state.sinks.creations[entity]),
            });
        },
        send_author_request() {

        },
    },
    watch: {
        query(q) {
            if (this.state.loggedIn && 't' in q) {
                this.switch_tab(q.t);
            } else {
                this.switch_tab(0);
            }
            /* this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.creations.publication_search,
                keep_content: false,
            });*/
        },
        current_state_user(s) {
            this.dispatch(s, this, this.state.sinks.reads.user);
        },
        current_state_creation_author(s) {
            this.dispatch(s, this, this.state.sinks.creations.author);
        },
        current_state_creation_user(s) {
            this.dispatch(s, this, this.state.sinks.creations.user);
        },
    },
    computed: {
        user() {
            if (this.state.author_mode) {
                const content = this.fcontent(this.state.sinks.reads.user);
                if (content instanceof Array && content.length > 0) {
                    return { author: content[0],
                        firstname: content[0].firstname,
                        lastname: content[0].lastname,
                        fullname: content[0].fullname };
                }
                return {};
            }
            const content = this.fcontent(this.state.sinks.reads.user);
            if (content instanceof Array && content.length > 0) {
                return content[0];
            }
            return {};
        },
        user_forms() {
            const content = this.fcontent(this.state.sinks.reads.user_forms);
            if (!(content instanceof Array) || content.length === 0) {
                return () => [];
            }
            return (f) => {
                const r = content.filter(c => c.name === f);
                if (r.length > 0) {
                    return r[0];
                }
                return [];
            };
        },
        affiliations() {
            const author = this.author;

            if (author && author.denormalization && author.denormalization.affiliations) {
                let aff = author.denormalization.affiliations;
                if (!(aff instanceof Array)) {
                    aff = [aff];
                }

                aff.sort((a, b) => (parseInt(b.from, 10) - parseInt(a.from, 10)));
                return aff;
            }

            return [];
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
        default_deposit_query() {
            return JSON.stringify({
                $and: [
                    Queries.no_other_version,
                    { depositor: this.user ? this.user._id : null },
                ],
            });
        },
        deposit_query() {
            const s = {
                $and: [
                    Queries.no_other_version,
                    { $or: Queries.publication_search.$or },
                    { depositor: this.user ? this.user._id : null },
                ],
            };
            return JSON.stringify(s);
        },
        default_search_publications_query() {
            const a = { 'authors._id': (this.author && this.author._id ? this.author._id : null) };
            let s = {};
            if (this.loggedIn) {
                s = {
                    $and: [
                        Queries.no_other_version,
                        a,
                        Queries.viewable(this.my_user._id, this.my_author),
                    ],
                };
            } else {
                s = {
                    $and: [
                        Queries.no_other_version,
                        Queries.published,
                        Queries.viewable(this.my_user._id, this.my_author),
                        a,
                    ],
                };
            }
            return JSON.stringify(s);
        },
        search_publications_query() {
            const a = { 'authors._id': (this.author && this.author._id ? this.author._id : null) };
            let s = {};
            if (this.loggedIn) {
                s = {
                    $and: [
                        Queries.no_other_version,
                        { $or: Queries.publication_search.$or },
                        Queries.viewable(this.my_user._id, this.my_author),
                        a,
                    ],
                };
            } else {
                s = {
                    $and: [
                        Queries.no_other_version,
                        Queries.published,
                        Queries.viewable(this.my_user._id, this.my_author),
                        { $or: Queries.publication_search.$or },
                        a,
                    ],
                };
            }
            return JSON.stringify(s);
        },
        current_state_user() {
            return this.fstate(this.state.sinks.reads.user);
        },
        current_state_creation_user() {
            return this.fstate(this.state.sinks.creations.user);
        },
        current_state_creation_author() {
            return this.fstate(this.state.sinks.creations.author);
        },
    },
    beforeMount() {
        this.state.author_mode = this.$route.matched[0].path === '/a/:id/profile';
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.user_forms,
            keep_content: false,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.user_forms,
            path: this.state.paths.reads.user_forms,
            body: {
                where: {
                    name: ['user_front_general_settings', 'user_front_affiliations', 'user_front_external_ids'],
                },
                population: ['fields.subform', 'fields.datasource'],
            },
        });


        if (this.state.author_mode) {
            this.$store.dispatch('search', {
                form: this.state.sinks.reads.user,
                path: this.state.paths.reads.author,
                body: {
                    where: {
                        _id: this.$route.params.id,
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
                    population: ['author', 'roles._id'],
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
