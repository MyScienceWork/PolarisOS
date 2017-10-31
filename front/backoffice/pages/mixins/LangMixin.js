
module.exports = {
    methods: {
        lang(key) {
            return key in this.clang ? this.clang[key]['n/a'] : key;
        },
        qlang(key, n) {
            // TODO implement
            return key in this.clang ? this.clang[key]['n/a'] : key;
        },
    },
    computed: {
        clang() {
            return this.$store.state.lang_content[this.$store.state.interfaceLang];
        },
    },
};
