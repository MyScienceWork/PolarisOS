const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');

const SearchResults = require('../browse/subcomponents/SearchResults.vue');
const SearchBar = require('../browse/subcomponents/SearchBar.vue');

module.exports = {
    mixins: [LangMixin, FormMixin],
    components: {
        SearchBar,
        SearchResults,
    },
    data() {
        return {
            state: {
            },
        };
    },
    methods: {

    },
    computed: {
        query() {
            return JSON.stringify({
                'title.content': '{{search}}',
                'abstracts.content': '{{search}}',
                'denormalization.authors.fullname': '{{search}}',
                'denormalization.classifications.label': '{{search}}',
                'denormalization.contributors.fullname': '{{search}}',
                'denormalization.diffusion.internal_collection': '{{search}}',
                'denormalization.diffusion.projects.name': '{{search}}',
                'denormalization.diffusion.research_team': '{{search}}',
                'denormalization.diffusion.surveys.name': '{{search}}',
                'denormalization.journal': '{{search}}',
                'denormalization.type': '{{search}}',
                'denormalization.subtype': '{{search}}',
            });
        },
    },
};
