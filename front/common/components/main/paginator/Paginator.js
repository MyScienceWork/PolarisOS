module.exports = {
    props: ['numberOfItems', 'itemsPerPage', 'skip'],
    data() {
        return {
            state: {
                first_page: 1,
                current_page: 1,
                last_page: 1,
            },
        };
    },
    methods: {
        goto(page, e) {
            e.preventDefault();
            if (page < 1) {
                return;
            }
            if (page > this.state.last_page) {
                return;
            }
            this.state.current_page = page;
        },
    },
    mounted() {
        this.state.last_page = Math.ceil(this.numberOfItems / this.itemsPerPage);
        this.state.current_page = parseInt((this.skip + this.itemsPerPage) / this.itemsPerPage, 10);
    },
};
