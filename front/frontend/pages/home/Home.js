const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
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
                size: 3,
                population: ['authors._id', 'journal'],
            },
        });
    },
    computed: {
        content() {
            return this.fcontent(this.state.forms.psink);
        },
        items() {
            if (this.content && this.content instanceof Array && this.content.length > 0) {
                const items = this.content.map(c => ({ html: Handlebars.compile(c.denormalization.type.template || '')(c), _id: c._id }));
                return items;
            }
            return [];
        },
        navs() {
            return BrowsingList;
        },
    },
};
