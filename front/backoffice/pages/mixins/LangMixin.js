const StringUtils = require('../../utils/strings');

module.exports = {
    methods: {
        lang(key, obj, n) {
            if (!(key in this.clang)) {
                return key;
            }

            const info = this.clang[key];
            let text = key;
            // TODO finish implementation for few and many
            if (n == null) {
                text = info['n/a'] || key;
            } else if (n === 0) {
                text = info.zero || info['n/a'] || key;
            } else if (n === 1) {
                text = info.one || info['n/a'] || key;
            } else if (n === 2) {
                text = info.two || info['n/a'] || key;
            } else {
                text = info.other || info['n/a'] || key;
            }

            if (obj == null || Object.keys(obj).length === 0) {
                return text;
            }

            return StringUtils.format_with_obj(text, obj);
        },
    },
    computed: {
        clang() {
            return this.$store.state.lang_content[this.$store.state.interfaceLang];
        },
    },
};
