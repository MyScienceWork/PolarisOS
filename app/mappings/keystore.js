module.exports = {
    msw: {
        mappings: {
            keystore: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    label: {
                        type: 'text',
                        index: false,
                    },
                    value: {
                        type: 'keyword',
                    },
                    type: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
