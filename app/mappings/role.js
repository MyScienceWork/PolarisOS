module.exports = {
    msw: {
        mappings: {
            role: {
                dynamic: 'false',
                dynamic_date_formats: [],
                properties: {
                    name: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    rights: {
                        type: 'nested',
                        properties: {
                            entity: {
                                type: 'keyword',
                            },
                            c: {
                                type: 'boolean',
                            },
                            r: {
                                type: 'boolean',
                            },
                            u: {
                                type: 'boolean',
                            },
                            d: {
                                type: 'boolean',
                            },
                        },
                    },
                },
            },
        },
    },
};
