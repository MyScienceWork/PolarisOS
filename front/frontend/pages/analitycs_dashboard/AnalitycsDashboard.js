const _ = require('lodash');
const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const FormCleanerMixin = require('../../../common/mixins/FormCleanerMixin');
const RequestsMixin = require('../../../common/mixins/RequestsMixin');
const UserMixin = require('../../../common/mixins/UserMixin');

module.exports = {
    mixins: [LangMixin, RequestsMixin, FormMixin, FormCleanerMixin, UserMixin],
    data() {
        return {
        };
    },
    methods: {
    },
    components: {
    },
    watch: {
    },
    computed: {
        route_dashboard() {
            const env = process.env.NODE_ENV || 'development';
            if (env === 'development') {
                return 'http://localhost:5601/app/kibana#/dashboard/8c85a970-df6d-11e9-a2c6-99b64336e7cf?embed=true&_g=()&_a=(fullScreenMode:true)';
            }
            return 'https://analitycs-${window.location.host}/app/kibana#/dashboard/8c85a970-df6d-11e9-a2c6-99b64336e7cf?_g=()&_a=(description:\'\',filters:!(),fullScreenMode:!t,options:(darkTheme:!f,hidePanelTitles:!t,useMargins:!f),panels:!((embeddableConfig:(),gridData:(h:21,i:\'1\',w:48,x:0,y:0),id:\'0835eb20-fa80-11e9-9880-1da0dc2eca8c\',panelIndex:\'1\',type:visualization,version:\'6.8.4\')),query:(language:lucene,query:\'\'),timeRestore:!f,title:\'Dashboard%20list\',viewMode:view)';
        },
        heightIFrame() {
            // 174px height header
            // 24px height footer
            return `${window.innerHeight - 174 - 24}px`;
        },
    },
    beforeMount() {
    },
    mounted() {
    },
};
