module.exports = {
    msw: {
        mappings: {
            dynamic: 'strict',
            dynamic_date_formats: [],
            properties: {
                name: { type: 'text',
                    fields: {
                        raw: {
                            type: 'keyword',
                        },
                    },
                },
                file: { type: 'keyword' },
                variables: {
                    type: 'nested',
                    properties: {
                        name: { type: 'keyword' },
                        help: { type: 'keyword' },
                        type: { type: 'keyword' },
                        default: { type: 'keyword' },
                    },
                },
                texts: {
                    type: 'nested',
                    properties: {
                        name: { type: 'keyword' },
                        help: { type: 'keyword' },
                    },
                },
                events: {
                    type: 'nested',
                    properties: {
                        name: { type: 'keyword' },
                        help: { type: 'keyword' },
                    },
                },
            },
        },
    },
};
