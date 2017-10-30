module.exports = {
    msw: {
        mappings: {
            typology: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    label: {
                        type: 'text',
                    },
                    children: {
                        type: 'nested',
                        properties: {
                            label: {
                                type: 'text',
                            },
                        },
                    },
                },
            },
        },
    },
};
