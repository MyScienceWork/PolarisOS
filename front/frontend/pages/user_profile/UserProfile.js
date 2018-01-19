const LangMixin = require('../../../common/mixins/LangMixin');
const FormMixin = require('../../../common/mixins/FormMixin');
const APIRoutes = require('../../../common/api/routes');

module.exports = {
    mixins: [LangMixin, FormMixin],
    data() {
        return {
            state: {
                cform: 'user_profile_creation',
                rform: 'user_profile_read',
                path: APIRoutes.entity('user', 'POST'),
                rpath: APIRoutes.entity('user', 'POST', true),
                forms: {
                    name: 'user_profile_form',
                    fname: 'user_profile',
                },
            },
        };
    },
};
