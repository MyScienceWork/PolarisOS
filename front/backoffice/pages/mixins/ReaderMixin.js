const _ = require('lodash');
const Vue = require('vue');
const APIRoutes = require('../../../common/api/routes');
const Messages = require('../../../common/api/messages');

module.exports = {
    methods: {
        update(obj, entity) {
            this.$store.commit(Messages.NOOP, {
                form: this.state.forms.csink,
            });

            Vue.nextTick(() => {
                this.$store.commit(Messages.READ, {
                    form: this.state.forms.csink,
                    content: _.cloneDeep(obj),
                });
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
        mcontent(sink) {
            if (sink in this.$store.state.forms) {
                const form = this.$store.state.forms[sink];
                if (!(form.content instanceof Array)) {
                    return [];
                }
                return form.content || [];
            }
            return [];
        },
        mlength(sink) {
            return this.mcontent(sink).length;
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
            return this.mcontent(this.state.forms.rsink);
        },
        contentLength() {
            return this.mlength(this.state.forms.rsink);
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
