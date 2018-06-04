const StringUtils = require('../utils/strings');

module.exports = {
    methods: {
        lang(key, obj, n) {
            let l = {};
            if (this.clang) {
                l = this.clang;
            }
            return StringUtils.lang(key, obj, n, l);
        },
        hlang(key, obj, n) {
            let l = {};
            if (this.clang) {
                l = this.clang;
            }
            return StringUtils.hlang(key, obj, n, l);
        },
    },
    computed: {
        clang() {
            return this.$store.state.lang_content[this.$store.state.interfaceLang] || {};
        },
    },
};
