module.exports = {
    props: {
        widget: { required: false, type: Object },
        form: { required: true, type: String },
    },
    methods: {
    },
    computed: {
        langs() {
            return Langs;
        },
        variables() {
            if (this.widget == null) {
                return [];
            }
            return this.widget.variables;
        },
        texts() {
            if (this.widget == null) {
                return [];
            }
            return this.widget.texts;
        },
    },
};
