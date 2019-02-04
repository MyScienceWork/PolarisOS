const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const FormMixin = require('../../../common/mixins/FormMixin');
const Messages = require('../../../common/api/messages');
const _ = require('lodash');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                // displayLegacyNotice: false,
                paths: {
                    reads: {
                        about: APIRoutes.entity('about', 'GET'),
                    },
                },
                sinks: {
                    reads: {
                        about: 'about_read',
                    },
                },
            },
        };
    },
    components: {
    },
    methods: {

    },
    mounted() {
        this.$store.commit(Messages.INITIALIZE, {
            form: this.state.sinks.reads.about,
            keepContent: false,
        });

        this.$store.dispatch('single_read', {
            form: this.state.sinks.reads.about,
            path: this.state.paths.reads.about,
        });

        // if (this.$route.query && this.$route.query.legacy_notice === 'true') {
        //     this.state.displayLegacyNotice = true;
        // }
    },
    computed: {
        content_about() {
            const content = this.fcontent(this.state.sinks.reads.about);
            if (!(content instanceof Array)) {
                return [];
            }
            return content.sort((a, b) => a.order - b.order);
        },
        displayLegacyNotice: {
            get() {
                return !(this.$route.query && this.$route.query.legacy_notice === 'true');
            },
            set(nv) {
                const q = _.cloneDeep(this.$route.query || {});

                if (!nv) {
                    delete q.legacy_notice;
                } else {
                    q.legacy_notice = 'true';
                }
                if (Object.keys(q).length === 0) {
                    this.$router.replace({ query: null });
                } else {
                    this.$router.replace({ query: q });
                }
            },
        },
    },
};
