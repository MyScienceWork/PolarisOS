const APIRoutes = require('../../../api/routes');
const BrowserUtils = require('../../../utils/browser');
const LangMixin = require('../../../mixins/LangMixin');


module.exports = {
    mixins: [LangMixin],
    props: {
        mapping: { type: Object, required: true },
        sort: { type: Array, default: () => [] },
        query: { type: Object, default: () => ({}) },
        size: { type: Number, default: 1000 },
        iconSize: { type: String, default: 'is-large' },
        iconFontSize: { type: String, default: 'fa-2x' },
        langCode: { type: String, required: true },
        entity: { type: String, required: true },
    },
    data() {
        return {
            state: {
            },
        };
    },
    methods: {
    },
    mounted() {
    },
    computed: {
        url() {
            const m = BrowserUtils.utf8ToB64(JSON.stringify(this.mapping));
            const q = BrowserUtils.utf8ToB64(JSON.stringify(this.query));
            const s = BrowserUtils.utf8ToB64(JSON.stringify(this.sort));
            return APIRoutes.rss(this.entity, m, this.langCode, q, s, this.size);
        },
    },
};
