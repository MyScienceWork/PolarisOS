module.exports = {
    msw: {
        mappings: {
            dynamic: 'strict',
            dynamic_date_formats: [],
            properties: {
                name: {
                    type: 'keyword',
                },
                type: {
                    type: 'keyword',
                },
                email_template: {
                    type: 'keyword',
                },
                recipient: {
                    type: 'keyword',
                },
                entity_state: {
                    type: 'keyword',
                },
                state: {
                    type: 'keyword',
                }
            },
        },
    },
};
