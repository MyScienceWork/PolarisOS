const LangMixin = require('../../../common/mixins/LangMixin');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');
const _ = require('lodash');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
            state: {
                paths: {
                    reads: {
                    },
                },
                sinks: {
                    reads: {
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
    },
    computed: {
    },
};
