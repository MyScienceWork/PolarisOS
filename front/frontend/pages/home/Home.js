const _ = require('lodash');

const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const Queries = require('../../../common/specs/queries');
const BrowserUtils = require('../../../common/utils/browser');
const Handlebars = require('../../../../app/modules/utils/templating');

const Discovery = require('./subcomponents/Discovery.vue');
const LastDeposits = require('./subcomponents/LastDeposits.vue');
const Search = require('./subcomponents/Search.vue');

module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        publication: 'publication_read',
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
    },
    computed: {
        content() {
            return this.fcontent(this.state.sinks.reads.publication);
        },
        items() {
            if (this.content && this.content instanceof Array && this.content.length > 0) {
                const items = this.content.map((c) => {
                    const html = this.hlang(Handlebars.compile(c.denormalization.type.template || '')(c));
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
            return Queries.last_deposits;
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
