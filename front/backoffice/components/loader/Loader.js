module.exports = {
    name: 'Loader',
    props: ['primaryColor', 'secondaryColor'],
    data() {
        return {
            css: {
                primary: {
                    backgroundColor: this.primaryColor,
                },
                secondary: {
                    backgroundColor: this.secondaryColor,
                },
            },
        };
    },
};
