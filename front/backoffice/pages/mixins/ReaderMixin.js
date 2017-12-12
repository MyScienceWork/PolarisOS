const Vue = require('vue');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');

module.exports = {
    methods: {
        update(obj, entity) {
            this.$store.commit(Messages.READ, {
                form: this.state.forms.csink,
                content: obj,
            });
        },
        remove(obj, entity) {
            this.$store.dispatch('remove', {
                form: this.state.forms.rsink,
                path: APIRoutes.entity(entity, 'DEL', false, obj._id),
                rpath: this.state.rpath,
                rform: this.state.forms.rsink,
            });
        },
    },
    computed: {
        error() {
            if (this.state.forms.rsink in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.forms.rsink];
                return form.error;
            }
            return { };
        },
        content() {
            if (this.state.forms.rsink in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.forms.rsink];
                return form.content || [];
            }
            return [];
        },
        contentLength() {
            return this.content.length;
        },
    },
    watch: {
        error(n) {
            if (n && Object.keys(n).length > 0) {
                console.error(n.content.message);
                // toastr.error(n.content.message);
            }
        },
    },
};
