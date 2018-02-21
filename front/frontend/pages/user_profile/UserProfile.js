const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const APIRoutes = require('../../../common/api/routes');
const Auth = require('../../../common/utils/auth');
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
        author() {
            if (this.user.author) {
                return this.user.author;
            }
            return null;
        },
        affiliations() {
            const author = this.user.author;

            if (author && author.denormalization && author.denormalization.affiliations) {
                let aff = author.denormalization.affiliations;
                if (!(aff instanceof Array)) {
                    aff = [aff];
                }

                aff.sort((a, b) => (b.from - a.from));
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
        default_search_query() {
            return JSON.stringify({
                depositor: this.user._id,
            });
        },
        search_query() {
            return JSON.stringify({
                $and: [
                    {
                        $or: [
                            { 'title.content': '{{search}}' },
                            { 'abstracts.content': '{{search}}' },
                            { 'denormalization.authors.fullname': '{{search}}' },
                            { 'denormalization.classifications.label': '{{search}}' },
                            { 'denormalization.contributors.fullname': '{{search}}' },
                            { 'denormalization.diffusion.internal_collection': '{{search}}' },
                            { 'denormalization.diffusion.projects.name': '{{search}}' },
                            { 'denormalization.diffusion.research_team': '{{search}}' },
                            { 'denormalization.diffusion.surveys.name': '{{search}}' },
                            { 'denormalization.journal': '{{search}}' },
                            { 'denormalization.type': '{{search}}' },
                            { 'denormalization.subtype': '{{search}}' },
                        ],
                        depositor: this.user._id,
                    },
                ],
            });
        },
        default_search_publications_query() {
            return JSON.stringify({
                'authors._id': this.user.author ? this.user.author._id : null,
            });
        },
        search_publications_query() {
            return JSON.stringify({
                $and: [
                    {
                        $or: [
                            { 'title.content': '{{search}}' },
                            { 'abstracts.content': '{{search}}' },
                            { 'denormalization.authors.fullname': '{{search}}' },
                            { 'denormalization.classifications.label': '{{search}}' },
                            { 'denormalization.contributors.fullname': '{{search}}' },
                            { 'denormalization.diffusion.internal_collection': '{{search}}' },
                            { 'denormalization.diffusion.projects.name': '{{search}}' },
                            { 'denormalization.diffusion.research_team': '{{search}}' },
                            { 'denormalization.diffusion.surveys.name': '{{search}}' },
                            { 'denormalization.journal': '{{search}}' },
                            { 'denormalization.type': '{{search}}' },
                            { 'denormalization.subtype': '{{search}}' },
                        ],
                        'authors._id': this.user.author ? this.user.author._id : null,
                    },
                ],
            });
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
                        $$ids: { values: [this.$route.params.id] },
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
