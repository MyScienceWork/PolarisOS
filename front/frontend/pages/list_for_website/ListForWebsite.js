const _ = require('lodash');

const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const Queries = require('../../../common/specs/queries');
const Sortings = require('../../../common/specs/sortings');

const SearchResults = require('../browse/subcomponents/SearchResults.vue');


module.exports = {
    mixins: [LangMixin, FormMixin, FormCleanerMixin],
    components: {
        SearchResults,
    },
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        typology: 'typology_read',
                        publication: 'publication_read',
                    },
                    creations: {
                        search: 'publication_browse_search',
                    },
                },
                paths: {
                    reads: {
                        typology: APIRoutes.entity('typology', 'POST', true),
                        publication: APIRoutes.entity('publication', 'POST', true),
                    },
                },
            },
        };
    },
    computed: {
        default_query() {
            return JSON.stringify({ $and: [Queries.no_other_version, Queries.published] });
        },
        default_sorts() {
            return Sortings.sort_with_type_and_subtype(this.typology_order, this.subtypology_order, 'asc');
        },
        search_query() {
            return JSON.stringify({ $and: [Queries.no_other_version, Queries.published, Queries.author_name_or_id] });
        },
        typology_order() {
            const content = this.fcontent(this.state.sinks.reads.typology);
            if (!(content instanceof Array)) {
                return {};
            }

            return content.reduce((obj, type) => {
                obj[type._id] = type.order_view;
                return obj;
            }, {});
        },
        subtypology_order() {
            const content = this.fcontent(this.state.sinks.reads.typology);
            if (!(content instanceof Array)) {
                return {};
            }

            return content.map(type => type.children.reduce((obj, subtype) => {
                obj[subtype.name] = subtype.order_view;
                return obj;
            }, {})).reduce((obj, sub) => _.merge(obj, sub), {});
        },
    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.sinks.reads.typology,
            path: this.state.paths.reads.typology,
            body: {
                size: 10000,
            },
        });
    },
};
