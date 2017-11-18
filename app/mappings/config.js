module.exports = {
    msw: {
        mappings: {
            config: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    environment: {
                        type: 'keyword',
                    },
                    datasources: {
                        properties: {
                            prefix: {
                                type: 'keyword',
                                index: false,
                            },
                        },
                    },
                    langs: {
                        type: 'nested',
                        properties: {
                            value: {
                                type: 'keyword',
                            },
                        },
                    },
                },
            },
        },
    },
};
