const _ = require('lodash');

const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const UserMixin = require('../../../common/mixins/UserMixin');
const HtmlMixin = require('../../../common/mixins/HtmlMixin');
const Queries = require('../../../common/specs/queries');
const BrowserUtils = require('../../../common/utils/browser');
const Handlebars = require('../../../../app/modules/utils/templating');

const Discovery = require('./subcomponents/Discovery.vue');
const LastDeposits = require('./subcomponents/LastDeposits.vue');
const Search = require('./subcomponents/Search.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin, UserMixin, HtmlMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        publication: 'publication_read',
                        stats_publication: 'stats_publication_read',
                        stats_open_access: 'stats_oap_read',
                        menu: 'menu_read',
                        search: 'search_home_sink',
                    },
                },
                paths: {
                    reads: {
                        publication: APIRoutes.entity('publication', 'POST', true),
                        menu: APIRoutes.entity('menu', 'POST', true),
                    },
                },
            },
        };
    },
    components: {
        LastDeposits,
        Discovery,
        Search,
    },
    methods: {

    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.publication,
            path: this.state.paths.reads.publication,
            body: {
                size: 6,
                sort: [{ 'dates.deposit': 'desc' }],
                where: this.lastDepositsQuery,
            },
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.menu,
            path: this.state.paths.reads.menu,
            body: {
                size: 1,
                where: {
                    'menu.elements.name': 'f_nav_browse',
                },
            },
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.stats_publication,
            path: this.state.paths.reads.publication,
            body: {
                size: 0,
                where: {
                    $and: [
                        Queries.published,
                        Queries.no_other_version,
                        Queries.viewable(this.user._id, this.author),
                    ],
                },
            },
        });
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.stats_open_access,
            path: this.state.paths.reads.publication,
            body: {
                size: 0,
                where: {
                    $and: [{ 'diffusion.rights.access': ['AWF0ZQmRfoecpXq21Jl9'] },
                        Queries.published,
                        Queries.no_other_version, Queries.viewable(this.user._id, this.author)],
                },
            },
        });
    },
    computed: {
        content() {
            return this.fcontent(this.state.sinks.reads.publication);
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
        stats() {
            return [
                { label: 'l_deposit',
                    label_count: 'l_reference',
                    count: this.stats_count(this.state.sinks.reads.stats_publication),
                    icon: 'fa-file-text' },
                { label: 'l_open_access',
                    label_count: 'l_publication',
                    count: this.stats_count(this.state.sinks.reads.stats_open_access),
                    icon: 'fa-unlock-alt' },
            ];
        },
        items() {
            console.log("this is items");
            if (this.content && this.content instanceof Array && this.content.length > 0) {
                const items = this.content.map((c) => {
                    const html = this.filter_ined_profile_links(this.hlang(Handlebars.compile(c.denormalization.type.template || '')(c)));
                    c.html = html;
                    return c;
                });
                return items;
            }
            return [];
        },
        navs() {
            const content = this.fcontent(this.state.sinks.reads.menu);
            if (!content || !(content instanceof Array) || content.length === 0) {
                return [];
            }
            const idx = _.findIndex(content[0].elements, elt => elt.name === 'f_nav_browse');
            if (idx === -1) {
                return [];
            }
            const elt = content[0].elements[idx];
            return elt.submenus.map(celt => ({
                text: celt.name,
                query: celt.query,
            }));
        },
        lastDepositsQuery() {
            return Queries.last_deposits(this.user._id, this.author);
        },
        rssMapping() {
            return {
                title: '{{{title.content}}}',
                description: '{{{abstracts.0.content}}}',
                content: '',
                link: `${BrowserUtils.getURLHost(window.location)}/view/{{{_id}}}`,
                id: '{{_id}}',
            };
        },
    },
};
