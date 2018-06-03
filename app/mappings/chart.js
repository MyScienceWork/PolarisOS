module.exports = {
    msw: {
        mappings: {
            chart: {
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
                    chart: {
                        type: 'keyword',
                    },
                    query: {
                        type: 'keyword',
                    },
                    aggregation: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
