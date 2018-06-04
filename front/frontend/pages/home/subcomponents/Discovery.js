const LangMixin = require('../../../../common/mixins/LangMixin');
const FormMixin = require('../../../../common/mixins/FormMixin');
const Messages = require('../../../../common/api/messages');

module.exports = {
    mixins: [LangMixin, FormMixin],
    props: {
        navItems: { required: true, type: Array, default: () => [] },
    },
    data() {
        return {
            state: {
                more_options: false,
                search: '',
                forms: {
                    ssink: 'search_sink',
                    collector_sink: 'search_collector_sink',
                },
            },
        };
    },
    methods: {
    },
    computed: {
    },
    watch: {
    },
};
