module.exports = {
    msw: {
        mappings: {
            dynamic: 'strict',
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
                id: {
                    type: 'keyword',
                },
                content: {
                    type: 'keyword',
                    index: false,
                },
            },
        },
    },
};
