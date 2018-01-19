const StringUtils = require('../utils/strings');

module.exports = {
    methods: {
        lang(key, obj, n) {
            const clang = this.$store.state.lang_content[this.$store.state.interfaceLang] || {};
            return StringUtils.lang(key, obj, n, clang);
        },
    },
    computed: {
        clang() {
            return this.$store.state.lang_content[this.$store.state.interfaceLang] || {};
        },
    },
};
