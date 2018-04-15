const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const Queries = require('../../../common/specs/queries');
const BrowserUtils = require('../../../common/utils/browser');
const Handlebars = require('../../../../app/modules/utils/templating');

const Discovery = require('./subcomponents/Discovery.vue');
const LastDeposits = require('./subcomponents/LastDeposits.vue');
const Search = require('./subcomponents/Search.vue');
const BrowsingList = require('../../lists/browse');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                forms: {
                    psink: 'publication_sink',
                },
                pread_path: APIRoutes.entity('publication', 'POST', true),
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
            form: this.state.forms.psink,
            path: this.state.pread_path,
            body: {
                size: 6,
                sort: [{ 'dates.deposit': 'desc' }],
                where: this.lastDepositsQuery,
            },
        });
    },
    computed: {
        content() {
            return this.fcontent(this.state.forms.psink);
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
            return BrowsingList;
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
