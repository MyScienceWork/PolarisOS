const Messages = require('../api/messages');

module.exports = {
    props: {
        unregister: { default: true, type: Boolean },
    },
    mounted() {
        this.$store.commit(Messages.REGISTER_FORM_ELEMENT, { form: this.form, name: this.name });
    },
    beforeDestroy() {
        if (this.unregister) {
            this.$store.commit(Messages.UNREGISTER_FORM_ELEMENT, { form: this.form,
                name: this.name });
        }
    },
};
