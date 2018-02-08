const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const Messages = require('../../../../common/api/messages');
const APIRoutes = require('../../../../common/api/routes');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        navItems: { required: true, type: Array },
    },
    data() {
        return {
            state: {
                sinks: {
                    creations: {
                        browse: 'browsing_creation',
                        selected: 'browsing_selected_creation',
                    },
                    reads: {
                        search: 'search_read',
                    },
                },
            },
        };
    },
    mounted() {
        const query = this.$route.query;
        this.make_request(query);
    },
    methods: {
        browse(e) {
            e.preventDefault();
            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.creations.selected,
            });
        },
        make_request(query) {
            const entity = query.entity;
            if (entity == null || entity.trim() === '') {

            } else {
                this.$store.dispatch('search', {
                    form: this.state.sinks.creations.browse,
                    path: APIRoutes.entity(entity, 'POST', true),
                    body: {
                        projection: ['name', 'title', 'label', 'fullname'],
                    },
                });
            }
        },

        send_information(sink) {
            if (sink !== this.state.sinks.creations.selected) {
                return;
            }

            const content = this.fcontent(this.state.sinks.creations.selected);
            if ('browsing_terms' in content) {
                const ids = content.browsing_terms.map(b => b._id);

                this.$store.dispatch('search', {
                    form: this.state.sinks.reads.search,
                    path: APIRoutes.entity('publication', 'POST', true),
                    body: {
                        size: 50,
                        where: {
                            [this.query.b]: ids,
                        },
                    },
                });
            }
        },
    },
    watch: {
        query(q) {
            this.make_request(q);
        },
        current_state(s) {
            this.dispatch(s, this, this.state.sinks.creations.selected);
        },
    },
    computed: {
        query() {
            return this.$route.query;
        },
        current_nav() {
            const query = this.$route.query;
            return query.i != null && query.i >= 0 ? this.navItems[query.i] : {};
        },
        options() {
            const content = this.fcontent(this.state.sinks.creations.browse);
            if (!(content instanceof Array)) {
                return [];
            }

            return content.map((c) => {
                const label = Object.keys(c).filter(k => k !== '_id')[0];
                c[label] = this.lang(c[label]);
                return c;
            });
        },
        label() {
            if (this.options.length > 0) {
                const info = this.options[0];
                return Object.keys(info).filter(e => e !== '_id')[0];
            }
            return '_id';
        },
        current_state() {
            return this.fstate(this.state.sinks.creations.selected);
        },
    },

};
