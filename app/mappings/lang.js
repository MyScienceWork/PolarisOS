module.exports = {
    msw: {
        mappings: {
            lang: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    key: {
                        type: 'keyword',
                    },
                    values: {
                        type: 'nested',
                        properties: {
                            value: {
                                type: 'text',
                                index: false,
                            },
                            quantity: {
                                type: 'keyword',
                            },
                        },
                    },
                    lang: {
                        type: 'keyword',
                    },
                    parts: {
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
