const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                pread_path: APIRoutes.entity('publication', 'POST', true),
                forms: {
                    collector_sink: 'search_collector_sink',
                },
            },
        };
    },
    methods: {

    },
    computed: {
        content() {
            return this.fform(this.state.forms.collector_sink);
        },
        items() {
            if (this.content && this.content instanceof Array && this.content.length > 0) {
                const items = this.content.map((c) => {
                    const title = c.titles && c.titles.length > 0 && c.titles[0].content ? c.titles[0].content : '';
                    const authors = c.authors ? c.authors.map(a => a._id.fullname) : [];
                    const journal = c.journal ? c.journal.name : '';
                    return { html: `${authors.join(', ')}. <b>${title}</b>. ${journal}.` };
                });
                return items;
            }
            return [];
        },
    },
};
