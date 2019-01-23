module.exports = {
    msw: {
        mappings: {
            cache: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    key: {
                        type: 'keyword',
                    },
                    entity: {
                        type: 'keyword',
                    },
                    value: {
                        type: 'text',
                    },
                    ttl: {
                        type: 'keyword',
                    },
                    createdAt: {
                        type: 'date',
                    },
                },
            },
        },
    },
};
