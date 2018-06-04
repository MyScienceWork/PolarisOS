const LangMixin = require('./LangMixin');
const Toastr = require('toastr');

module.exports = {
    mixins: [LangMixin],
    methods: {
        notify(message, type = 'success') {
            Toastr[type](this.lang(message),
                '', { preventDuplicates: true });
        },
        error(message) {
            return this.notify(message, 'error');
        },
        success(message) {
            return this.notify(message, 'success');
        },
        warning(message) {
            return this.notify(message, 'warning');
        },
    },
};
