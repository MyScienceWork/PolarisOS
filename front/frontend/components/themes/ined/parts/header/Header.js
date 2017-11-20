const Navbar = require('../navbar/Navbar.vue');
const LangMixin = require('../../../../../../common/mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    components: {
        navbar: Navbar,
    },
};
