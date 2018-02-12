const _ = require('lodash');
const Messages = require('../api/messages');

module.exports = {
    beforeDestroy() {
        if ('sinks' in this.state) {
            if ('reads' in this.state.sinks) {
                _.forEach(this.state.sinks.reads, (name) => {
                    this.$store.commit(Messages.REMOVE_FORM, {
                        form: name,
                    });
                });
            }
            if ('creations' in this.state.sinks) {
                _.forEach(this.state.sinks.creations, (name) => {
                    this.$store.commit(Messages.REMOVE_FORM, {
                        form: name,
                    });
                });
            }
        }
    },
};
