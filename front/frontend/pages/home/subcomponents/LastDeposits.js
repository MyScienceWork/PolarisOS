const LangMixin = require('../../../../common/mixins/LangMixin');
const Auth = require('../../../../common/utils/auth');

const Results = require('../../browse/subcomponents/Results.vue');

module.exports = {
    mixins: [LangMixin],
    props: {
        items: { required: true, type: Array },
    },
    components: {
        Results,
    },
    data() {
        return {
            state: {
                loggedIn: false,
            },
        };
    },
    beforeMount() {
        Auth.loggedIn('publication', ['c', 'u']).then((ok) => {
            this.state.loggedIn = ok;
        }).catch(err => console.error(err));
    },
    computed: {
        user() {
            return Auth.user();
        },
    },
};
