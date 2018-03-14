const StringUtils = require('../utils/strings');

module.exports = {
    methods: {
        lang(key, obj, n) {
            return StringUtils.lang(key, obj, n, this.clang);
        },
        hlang(key, obj, n) {
            return StringUtils.hlang(key, obj, n, this.clang);
        },
    },
    computed: {
        clang() {
            return this.$store.state.lang_content[this.$store.state.interfaceLang] || {};
        },
    },
};
