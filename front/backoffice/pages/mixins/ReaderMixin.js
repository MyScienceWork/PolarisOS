const Vue = require('vue');
const APIRoutes = require('../../api/routes');
const Messages = require('../../api/messages');

module.exports = {
    methods: {
        update(obj, entity) {
            this.$store.commit(Messages.CANCEL_FORM, {
                form: this.state.cform,
            });

            Vue.nextTick(() => {
                this.$store.commit(Messages.UPDATE_MODE_FORM, {
                    form: this.state.cform,
                    update: true,
                    content: obj,
                });
            });
        },
        remove(obj, entity) {
            this.$store.dispatch('remove', {
                form: this.state.rform,
                path: APIRoutes.entity(entity, 'DEL', false, obj._id),
            });
        },
    },
    beforeMount() {
        this.$store.commit(Messages.CREATE_FORM, {
            form: this.state.rform,
            content: [],
        });
    },
    computed: {
        error() {
            if (this.state.rform in this.$store.state.forms) {
                const form = this.$store.state.forms[this.state.rform];
                return form.error;
            }
            return { };
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
