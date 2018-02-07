const _ = require('lodash');
const LangMixin = require('../mixins/LangMixin');

module.exports = {
    mixins: [LangMixin],
    data() {
        return {
        };
    },
    methods: {
    },
    beforeMount() {
    },
    mounted() {
        console.log(JSON.stringify(this.page));
    },
    computed: {
        pages() {
            return this.$store.state.interface.pages;
        },
        page() {
            const selected_pages = this.pages.filter(p => p.route === this.$route.matched[0].path);
            if (selected_pages.length === 0) {
                return {};
            }

            const page = _.cloneDeep(selected_pages[0]);

            page.main.rows.forEach((row) => {
                row.widgets.sort((a, b) => a.begin_span - b.begin_span || a.end_span - b.end_span);
                row.widgets = row.widgets.map((widget) => {
                    if (widget.texts) {
                        widget.texts = widget.texts.reduce((obj, text) => {
                            obj[text.name] = this.lang(text.value);
                            return obj;
                        }, {});
                    }

                    // TODO
                    if (widget.variables) {
                    }

                    if (widget._id.events) {
                        widget.events = widget._id.events.reduce((obj, evt) => {
                            obj[evt.name] = evt.name;
                            return obj;
                        });
                    } else {
                        widget.events = {};
                    }

                    return widget;
                });
            });
            return page;
        },
    },
};
