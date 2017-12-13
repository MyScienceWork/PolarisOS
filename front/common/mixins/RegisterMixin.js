const Messages = require('../api/messages');

module.exports = {
    mounted() {
        this.$store.commit(Messages.REGISTER_FORM_ELEMENT, { form: this.form, name: this.name });
    },
    beforeDestroy() {
        this.$store.commit(Messages.UNREGISTER_FORM_ELEMENT, { form: this.form, name: this.name });
    },
};
