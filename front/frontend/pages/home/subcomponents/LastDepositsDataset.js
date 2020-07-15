const LangMixin = require('../../../../common/mixins/LangMixin');
const Auth = require('../../../../common/utils/auth');

module.exports = {
    mixins: [LangMixin],
    props: {
        items: { required: true, type: Array },
    },
    data() {
        return {
            state: {
                loggedIn: false,
            },
        };
    },
    beforeMount() {
        Auth.loggedIn('dataset', ['c', 'u']).then((ok) => {
            this.state.loggedIn = ok;
        }).catch(err => console.error(err));
    },
    computed: {
        user() {
            return Auth.user();
        },
    },
};
