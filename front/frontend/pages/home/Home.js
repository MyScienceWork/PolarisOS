const _ = require('lodash');

const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const Queries = require('../../../common/specs/queries');
const BrowserUtils = require('../../../common/utils/browser');
const Handlebars = require('../../../../app/modules/utils/templating');

const LastDeposits = require('./subcomponents/LastDeposits.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin, UserMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        project: 'project_read',
                        project_published: 'project_published_read',
                        project_reviewed_by_curator_1: 'project_reviewed_by_curator_1_read',
                        project_reviewed_by_curator_2: 'project_reviewed_by_curator_2_read',
                        project_rejected_by_curator_1: 'project_rejected_by_curator_1_read',
                        project_rejected_by_curator_2: 'project_rejected_by_curator_2_read',
                    },
                },
                paths: {
                    reads: {
                        project: APIRoutes.entity('project', 'POST', true),
                    },
                },
            },
        };
    },
    components: {
        LastDeposits,
    },
    methods: {

    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.project,
            path: this.state.paths.reads.project,
            body: {
                where: this.lastDepositsQuery,
            },
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.project_published,
            path: this.state.paths.reads.project,
            body: {
                where: this.lastDepositsQueryPublished,
            },
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.project_reviewed_by_curator_1,
            path: this.state.paths.reads.project,
            body: {
                where: this.lastDepositsQueryReviewed1,
            },
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.project_reviewed_by_curator_2,
            path: this.state.paths.reads.project,
            body: {
                where: this.lastDepositsQueryReviewed2,
            },
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.project_rejected_by_curator_1,
            path: this.state.paths.reads.project,
            body: {
                where: this.lastDepositsQueryRejected1,
            },
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.project_rejected_by_curator_2,
            path: this.state.paths.reads.project,
            body: {
                where: this.lastDepositsQueryRejected2,
            },
        });
    },
    computed: {
        content() {
            return this.fcontent(this.state.sinks.reads.project);
        },
        stats_count() {
            return (sink) => {
                const f = this.fform(sink);
                if (f && 'total' in f) {
                    return f.total;
                }
                return 0;
            };
        },
        stats_submitted() {
            return [
                { label: 'l_deposit_submitted',
                    label_count: 'l_projects',
                    count: this.stats_count(this.state.sinks.reads.project),
                    icon: 'fa-file-text' },
            ];
        },
        stats_published() {
            return [
                { label: 'l_deposit_published',
                    label_count: 'l_projects',
                    count: this.stats_count(this.state.sinks.reads.project_published),
                    icon: 'fa-file-text' },
            ];
        },
        stats_reviewed_by_curator_1() {
            return [
                { label: 'l_deposit_reviewed_by_curator_1',
                    label_count: 'l_projects',
                    count: this.stats_count(this.state.sinks.reads.project_reviewed_by_curator_1),
                    icon: 'fa-file-text' },
            ];
        },
        stats_reviewed_by_curator_2() {
            return [
                { label: 'l_deposit_reviewed_by_curator_2',
                    label_count: 'l_projects',
                    count: this.stats_count(this.state.sinks.reads.project_reviewed_by_curator_2),
                    icon: 'fa-file-text' },
            ];
        },
        stats_rejected_by_curator_1() {
            return [
                { label: 'l_deposit_rejected_by_curator_1',
                    label_count: 'l_projects',
                    count: this.stats_count(this.state.sinks.reads.project_rejected_by_curator_1),
                    icon: 'fa-file-text' },
            ];
        },
        stats_rejected_by_curator_2() {
            return [
                { label: 'l_deposit_rejected_by_curator_2',
                    label_count: 'l_projects',
                    count: this.stats_count(this.state.sinks.reads.project_rejected_by_curator_2),
                    icon: 'fa-file-text' },
            ];
        },

        items() {
            if (this.content && this.content instanceof Array && this.content.length > 0) {
                const item_show = this.content.slice(0, 11);
                const items = item_show.map((c) => {
                    const html = this.hlang(Handlebars.compile('{{title}}' || '')(c));
                    c.html = html;
                    return c;
                });
                return items;
            }
            return [];
        },
        lastDepositsQuery() {
            return Queries.last_deposits_submitted(this.user._id, this.roles);
        },
        lastDepositsQueryPublished() {
            return Queries.last_deposits_published(this.user._id, this.roles);
        },
        lastDepositsQueryReviewed1() {
            return Queries.last_deposits_reviewed_by_curator_1(this.user._id, this.roles);
        },
        lastDepositsQueryReviewed2() {
            return Queries.last_deposits_reviewed_by_curator_2(this.user._id, this.roles);
        },
        lastDepositsQueryRejected1() {
            return Queries.last_deposits_rejected_by_curator_1(this.user._id, this.roles);
        },
        lastDepositsQueryRejected2() {
            return Queries.last_deposits_rejected_by_curator_2(this.user._id, this.roles);
        },
    },
};
