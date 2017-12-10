const Messages = require('../../../../api/messages');

module.exports = {
    computed: {
        validations() {
            if (this.form in this.$store.state.forms) {
                const form = this.$store.state.forms[this.form];
                if (this.name in form.validations) {
                    return form.validations[this.name].map(o => o.message);
                }
                return [];
            }
            return [];
        },
        update_mode() {
            if (this.form in this.$store.state.forms) {
                const form = this.$store.state.forms[this.form];
                return form.update;
            }
            return false;
            vi;
        },
        reclaim() {
            if (this.form in this.$store.state.forms) {
                const form = this.$store.state.forms[this.form];
                return form.reclaim;
            }
            return false;
        },
        cancel() {
            if (this.form in this.$store.state.forms) {
                const form = this.$store.state.forms[this.form];
                return form.cancel;
            }
            return false;
        },
    },
    mounted() {
        this.update();
        this.$store.commit(Messages.ADD_TO_FORM_POOL, { form: this.form, name: this.name });
    },
    beforeDestroy() {
        this.$store.commit(Messages.REMOVE_FROM_FORM_POOL, { form: this.form, name: this.name });
    },
    watch: {
        update_mode() {
            this.update();
        },
    },
};
