module.exports = {
    msw: {
        mappings: {
            lang: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    key: {
                        type: 'keyword',
                    },
                    value: {
                        type: 'text',
                        index: false,
                    },
                    lang: {
                        type: 'keyword',
                    },
                    part: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
