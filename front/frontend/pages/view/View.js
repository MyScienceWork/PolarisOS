const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const Handlebars = require('../../../../app/modules/utils/templating');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                sinks: {
                    reads: {
                        item: 'item_read',
                        author: 'author_read',
                    },
                },
                paths: {
                    reads: {
                        item: APIRoutes.entity('publication', 'POST', true),
                        author: APIRoutes.entity('author', 'GET', true),
                    },
                },
            },
        };
    },
    methods: {

    },
    watch: {
        current_state_item(s) {
            this.dispatch(s, this, this.state.sinks.reads.item);
        },
    },
    computed: {
        item_id() {
            return this.$route.params.id || '';
        },
        current_state_item() {
            return this.fstate(this.state.sinks.reads.item);
        },
        content_item() {
            const content = this.fcontent(this.state.sinks.reads.item);
            if (content instanceof Array && content.length > 0) {
                const item = content[0];
                item.html = Handlebars.compile(item.denormalization.type.template)(item);
                return item;
            }
            return content;
        },
        abstracts() {
            if (!this.content_item.abstracts) {
                return [];
            }
            const abstracts = this.content_item.abstracts.filter(a => a.content && a.content.trim() !== '');
            return abstracts;
        },
        abstract() {
            return (lang) => {
                if (this.abstracts.length === 0) {
                    return '';
                }

                const filtered = this.content_item.abstracts.filter(a => a.lang === lang);
                if (filtered.length === 0) {
                    return this.content_item.abstracts[0].content;
                }
                return filtered[0].content;
            };
        },
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.item,
            keepContent: false,
        });

        this.$store.dispatch('search', {
            form: this.state.sinks.reads.item,
            path: this.state.paths.reads.item,
            body: {
                where: {
                    _id: this.item_id,
                },
            },
        });
    },

};
