module.exports = {
    props: {
        widget: { required: false, type: Object },
        form: { required: true, type: String },
        prefix: { required: true, type: String },
    },
    methods: {
    },
    computed: {
        variables() {
            if (this.widget == null) {
                return [];
            }

            if (this.widget.variables == null) {
                return [];
            }

            return this.widget.variables;
        },
        texts() {
            if (this.widget == null) {
                return [];
            }

            if (this.widget.texts == null) {
                return [];
            }
            return this.widget.texts;
        },
    },
};
