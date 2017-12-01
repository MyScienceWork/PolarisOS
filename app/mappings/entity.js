module.exports = {
    msw: {
        mappings: {
            entity: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
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
