const Utils = require('../../../common/utils/utils');
const Messages = require('../../../common/api/messages');
const APIRoutes = require('../../../common/api/routes');
const ReaderMixin = require('../../../common/mixins/ReaderMixin');
const LangMixin = require('../../../common/mixins/LangMixin');
const BrowserUtils = require('../../../common/utils/browser');

module.exports = {
    mixins: [ReaderMixin, LangMixin],
    data() {
        return {
            state: {
                itemsPerPage: 1000,
                itemsPerRow: 1,
                paths: {
                    reads: {
                        publication: APIRoutes.entity('publication', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        publication: 'publication_read',
                    },
                },
                generator: [[
                    {
                        'denormalization.type.label': { type: 'translate', always: true },
                    },
                    {
                        subtype: { type: 'value', value_source: 'typology/children.*.label', always: true, translate: true },
                    },
                    {
                        title: { type: 'lv', label: 'content', value: 'lang', always: true },
                    },
                    {
                        title: { type: 'lv', label: 'content', value: 'lang', always: true },
                    },
                    {
                        subtitles: { type: 'list_lv', label: 'content', value: 'lang', always: false },
                    },
                    {
                        translated_titles: { type: 'list_lv', label: 'content', value: 'lang', always: false },
                    },
                    {
                        lang: { type: 'normal', always: true },
                    },
                    {
                        'denormalization.journal': { type: 'normal', always: true },
                    },
                    {
                        newspaper: { type: 'normal', always: false },
                    },
                    {
                        contributors: { type: 'list_lv', always: true, label: 'label', value: 'value', label_source: 'author/fullname', value_source: 'contributor_role/label' },
                    },
                    {
                        publication_title: { type: 'normal', always: false },
                    },
                    {
                        'denormalization.localisation.country': { type: 'normal', always: false, translate: true },
                    },
                    {
                        'localisation.city': { type: 'normal', always: false },
                    },
                    {
                        'denormalization.delivery_institution': { type: 'normal', always: false, translate: true },
                    },
                    {
                        'dates.publication': { type: 'date', always: true },
                    },
                    {
                        'dates.start': { type: 'date', always: false },
                    },
                    {
                        'dates.end': { type: 'date', always: false },
                    },
                ], [

                ]],
            },
        };
    },
    methods: {
    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.publication,
            keepContent: false,
        });

        this.$store.state.requests.push({
            name: 'single_read',
            content: {
                form: this.state.sinks.reads.publication,
                path: this.state.paths.reads.publication,
            },
        });
    },
    watch: {
        error_publication(n) {
            return this.mwerror(this.state.sinks.reads.publication)(n);
        },
        current_read_state_publication(s) {
            return this.mwcurrent_read_state(this.state.sinks.reads.publication)(s);
        },
    },
    computed: {
        host() {
            return BrowserUtils.getURLHost(window.location);
        },
        content_publication() {
            const content = this.mcontent(this.state.sinks.reads.publication);
            return content;
        },
        length_publication() {
            return this.mlength(this.state.sinks.reads.publication);
        },
        read_content_publication() {
            const content = this.content_publication;
            return Utils.to_matrix(content, this.state.itemsPerRow);
        },
        error_publication() {
            return this.merror(this.state.sinks.reads.publication);
        },
        current_read_state_publication() {
            return this.mcurrent_read_state(this.state.sinks.reads.publication);
        },
    },
};
