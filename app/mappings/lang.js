module.exports = {
    msw: {
        mappings: {
            lang: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    key: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    values: {
                        type: 'nested',
                        properties: {
                            value: {
                                type: 'text',
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
