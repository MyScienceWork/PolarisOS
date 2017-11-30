module.exports = {
    msw: {
        mappings: {
            entity: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    index: {
                        type: 'keyword',
                    },
                    type: {
                        type: 'keyword',
                    },
                    model: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
