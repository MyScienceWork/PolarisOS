module.exports = {
    msw: {
        mappings: {
            datatemplate: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    label: {
                        type: 'text',
                        index: false,
                    },
                    name: {
                        type: 'keyword',
                    },
                    type: {
                        type: 'keyword',
                    },
                    form: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
