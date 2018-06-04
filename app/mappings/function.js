module.exports = {
    msw: {
        mappings: {
            function: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    type: {
                        type: 'keyword',
                    },
                    name: {
                        type: 'keyword',
                    },
                    arguments: {
                        type: 'nested',
                        properties: {
                            name: {
                                type: 'keyword',
                            },
                            type: {
                                type: 'keyword',
                            },
                            default: {
                                type: 'keyword',
                            },
                        },
                    },
                },
            },
        },
    },
};
