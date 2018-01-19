const Utils = require('../../../common/utils/utils');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [ReaderMixin, LangMixin, FormMixin],
    data() {
        return {
            state: {
                path: APIRoutes.entity(this.entity(), 'POST'),
                rpath: APIRoutes.entity(this.entity(), 'GET'),
                forms: {
                    csink: `${this.$route.params.datainstance}_creation`,
                    rsink: `${this.$route.params.datainstance}_read`,
                    rsink_entity: 'entity_read',
                    rsink_entity_form: `${this.$route.params.datainstance}_form`,
                },
                itemsPerPage: 20,
                itemsPerRow: 2,
            },
        };
    },
    methods: {
        entity() {
            const instance = this.$route.params.datainstance;
            return instance;
        },
        search_body() {
            return {
                size: 10000,
            };
        },
    },
    mounted() {
        this.$store.dispatch('single_read', {
            form: this.state.forms.rsink,
            path: this.state.rpath,
        });

        const entity_promise = this.$store.dispatch('search', {
            form: this.state.forms.rsink_entity,
            path: APIRoutes.entity('entity', 'POST', true),
            body: {
                where: {
                    type: this.entity(),
                },
            },
        });

        entity_promise.then(() => {
            if (this.state.forms.rsink_entity in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.forms.rsink_entity];
                const content = form.content || [];
                if (content.length > 0) {
                    this.fetch_form(content[0].form, this.state.forms.rsink_entity_form);
                }
            }
        }).catch((err) => { console.error(err); });
    },
    computed: {
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
    },
};
