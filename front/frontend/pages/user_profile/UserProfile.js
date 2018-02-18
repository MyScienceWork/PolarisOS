const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const APIRoutes = require('../../../common/api/routes');
const Auth = require('../../../common/utils/auth');

const LastDeposits = require('../home/subcomponents/LastDeposits.vue');
const SearchBar = require('../browse/subcomponents/SearchBar.vue');
const SearchResults = require('../browse/subcomponents/SearchResults.vue');

module.exports = {
    mixins: [LangMixin, FormMixin],
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
                        publication: APIRoutes.entity('publication', 'POST', true),
                    },
                },
                current_tab: 0,
                loggedIn: true,
                last_deposits_number: 10,
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
            const content = this.fcontent(this.state.sinks.reads.user);
            if (content instanceof Array && content.length > 0) {
                return content[0];
            }
            return {};
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
    mounted() {
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

        Auth.loggedIn('my_user', ['r', 'c', 'u']).then((ok) => {
            // this.state.loggedIn = ok;
            if (this.state.loggedIn && this.$route.query.t) {
                this.switch_tab(this.$route.query.t);
            }
        }).catch(err => console.error(err));
    },
};
