const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const APIRoutes = require('../../../common/api/routes');
const Auth = require('../../../common/utils/auth');

const LastDeposits = require('../home/subcomponents/LastDeposits.vue');

module.exports = {
    mixins: [LangMixin, FormMixin],
    components: {
        LastDeposits,
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        user: 'user_profile_creation',
                    },
                    reads: {
                        user: 'user_profile_read',
                        publication: 'user_publication_read',
                        last_publication: 'user_last_publication_read',
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
        retrieve_deposits() {
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
        loggedIn(nli) {
            if (!nli) {
                return;
            }
            this.retrieve_deposits();
        },
        user() {
            if (!this.user.author_id) {
                return;
            }

            this.$store.dispatch('search', {
                form: this.state.sinks.reads.last_publication,
                path: this.state.paths.reads.publication,
                body: {
                    where: {
                        'authors._id': this.user.author_id,
                    },
                    sort: [{ 'dates.deposit': 'desc' }, { _uid: 'desc' }],
                    size: this.state.last_deposits_number,
                },
            });

            this.retrieve_deposits();
        },
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
        loggedIn() {
            return this.state.loggedIn;
        },
        last_deposits() {
            const content = this.fcontent(this.state.sinks.reads.last_publication);
            if (content instanceof Array && content.length > 0) {
                return content;
            }
            return [];
        },
        query() {
            return this.$route.query;
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
