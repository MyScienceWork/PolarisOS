const _ = require('lodash');
const moment = require('moment');

const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const QueryMixin = require('../../../../common/mixins/QueryMixin');
const FormCleanerMixin = require('../../../../common/mixins/FormCleanerMixin');
const Messages = require('../../../../common/api/messages');
const APIRoutes = require('../../../../common/api/routes');

module.exports = {
    mixins: [LangMixin, FormMixin, QueryMixin, FormCleanerMixin],
    props: {
        navItems: { required: true, type: Array },
        filters: { type: Array, default: () => [] },
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
        if (Object.keys(this.state.query).length === 0) {
            this.state.query = { b: 'authors._id', i: 0, entity: 'author' };
        }
        this.post_hook_query_changed(this.state.query);
    },
    methods: {
        browse(e) {
            e.preventDefault();
            this.$store.commit(Messages.COLLECT, {
                form: this.state.sinks.creations.selected,
            });
        },
        post_hook_query_changed(query) {
            const entity = query.entity;
            this.$store.commit(Messages.INITIALIZE, {
                form: this.state.sinks.creations.browse,
                keep_content: false,
            });

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
                this.$emit('update:filters', [JSON.stringify({ [this.state.query.b]: ids })]);
            }
        },
    },
    watch: {
        current_state(s) {
            this.dispatch(s, this, this.state.sinks.creations.selected);
        },
    },
    computed: {
        current_nav() {
            const query = this.state.query;
            return query.i != null && query.i >= 0 ? this.navItems[query.i] : {};
        },
        options() {
            const entity = this.state.query.entity;
            if (entity == null || entity.trim() === '') {
                const r = _.range(1700, parseInt(moment().format('YYYY'), 10) + 1);
                r.sort((a, b) => b - a);
                return r.map(a => ({ label: `${a}`, _id: `${a}` }));
            }

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
