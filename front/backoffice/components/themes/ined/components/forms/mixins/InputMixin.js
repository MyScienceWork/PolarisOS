const Messages = require('../../../../../../api/messages');

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
            const form = this.$store.state.forms[this.form];
            return form.update;
        },
        reclaim() {
            const form = this.$store.state.forms[this.form];
            return form.reclaim;
        },
        cancel() {
            const form = this.$store.state.forms[this.form];
            return form.cancel;
        },
    },
    mounted() {
        this.update();
        this.$store.commit(Messages.ADD_TO_FORM_POOL, { form: this.form });
    },
    beforeDestroy() {
        this.$store.commit(Messages.REMOVE_FROM_FORM_POOL, { form: this.form });
    },
    watch: {
        update_mode() {
            this.update();
        },
    },
};
