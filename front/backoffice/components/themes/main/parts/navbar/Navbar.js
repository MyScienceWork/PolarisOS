const _ = require('lodash');
const LangMixin = require('../../../../../../common/mixins/LangMixin');
const AccessMixin = require('../../../../../../common/mixins/AccessMixin');


module.exports = {
    props: ['menus'],
    mixins: [LangMixin, AccessMixin],
    data() {
        return {
            isShown: false,
            state: {
                routes: this.$router.options.routes.filter(r => r.path !== '/' && this.has_r_access(r.meta.access)),
                colors: ['red', 'orange', 'purple', 'brown', 'green', 'blue'],
            },
        };
    },
    computed: {
        accessible_menus() {
            return this.menus.map(submenus => submenus.filter(submenu => this.has_r_access(submenu.access)));
        },
    },
    methods: {
        show(e) {
            e.preventDefault();
            this.isShown = !this.isShown;
        },
    },
    mounted() {
    },
};
