module.exports = {
    msw: {
        mappings: {
            template: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    css: {
                        type: 'keyword',
                    },
                    name: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    image: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
