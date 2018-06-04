const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                forms: {
                    psink: 'project_sink',
                },
                pread_path: APIRoutes.entity('project', 'POST', true),
            },
        };
    },
    components: {
    },
    methods: {

    },
    mounted() {
        this.$store.dispatch('search', {
            form: this.state.forms.psink,
            path: this.state.pread_path,
            body: {
                size: 10,
                where: {
                    'topics.all_closed': false,
                    'amount.year': 2018,
                },
            },
        });
    },
    computed: {
        content() {
            return this.fcontent(this.state.forms.psink);
        },
        items() {
            if (this.content && this.content instanceof Array && this.content.length > 0) {
                const items = this.content.map((item) => {
                    let html = `<p class='title is-4'>${item.title} (${item.programme.framework})</p>`;
                    html += "<div class='card'>";
                    html += "<p class='is-5 title'>Budgets</p>";
                    html += '<hr />';
                    html += '<ul>';
                    html += item.budget.map(b => `<li><strong>Opening:</strong> ${b.opening}.<br /><strong>Amount</strong> (${b.amount.year}): ${b.amount.value}.</li>`).join('\n');
                    html += '</ul>';
                    html += '</div>';
                    html += `<a target="_blank" href='http://ec.europa.eu/research/participants/portal/desktop/en/opportunities/h2020/calls/${item.filename}.html'>More details...</a>`;
                    item.html = html;
                    return item;
                });
                return items;
            }
            return [];
        },
    },
};
