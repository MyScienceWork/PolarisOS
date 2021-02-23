module.exports = {
    name: 'Loader',
    props: ['primaryColor', 'secondaryColor'],
    data() {
        return {
            css: {
                primary: {
                    backgroundColor: '#0062A1',
                },
                secondary: {
                    backgroundColor: '#262626',
                },
            },
        };
    },
};
