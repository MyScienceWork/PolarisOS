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
                cform: `${this.$route.params.datainstance}_creation`,
                rform: `${this.$route.params.datainstance}_read`,
                itemsPerPage: 20,
                itemsPerRow: 2,
                rform_entity: 'entity_read',
                entity_form_sink: `${this.$route.params.datainstance}_form`,
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
            form: this.state.rform,
            path: this.state.rpath,
        });

        const entity_promise = this.$store.dispatch('search', {
            form: this.state.rform_entity,
            path: APIRoutes.entity('entity', 'POST', true),
            body: {
                where: {
                    type: this.entity(),
                },
            },
        });

        entity_promise.then(() => {
            if (this.state.rform_entity in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform_entity];
                const content = form.content || [];
                if (content.length > 0) {
                    this.fetch_form(content[0].form, this.state.entity_form_sink);
                }
            }
        }).catch((err) => { console.error(err); });
    },
    computed: {
        content() {
            if (this.state.rform in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform];
                const content = form.content || [];
                return content;
            }
            return [];
        },
        readContent() {
            return Utils.to_matrix(this.content, this.state.itemsPerRow);
        },
    },
};
