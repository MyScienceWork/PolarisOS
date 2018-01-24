module.exports = {
    msw: {
        mappings: {
            menu: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    name: {
                        type: 'keyword',
                    },
                    icon: {
                        type: 'keyword',
                    },
                    part: {
                        type: 'keyword',
                    },
                    page: {
                        type: 'keyword',
                    },
                    submenus: {
                        type: 'nested',
                        properties: {
                            name: {
                                type: 'keyword',
                            },
                            icon: {
                                type: 'keyword',
                            },
                            page: {
                                type: 'keyword',
                            },
                        },
                    },
                },
            },
        },
    },
};
