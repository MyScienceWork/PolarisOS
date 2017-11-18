module.exports = {
    msw: {
        mappings: {
            langref: {
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
                },
            },
        },
    },
};
