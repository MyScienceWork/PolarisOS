module.exports = {
    msw: {
        mappings: {
            datainstance: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    mid: {
                        type: 'keyword',
                    },
                    type: {
                        type: 'keyword',
                    },
                    fields: {
                        type: 'nested',
                        properties: {
                            key: {
                                type: 'keyword',
                            },
                            value: {
                                type: 'text',
                                index: false,
                            },
                            type: {
                                type: 'keyword',
                            },
                        },
                    },
                },
            },
        },
    },
};
