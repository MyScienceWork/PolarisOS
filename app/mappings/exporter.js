module.exports = {
    msw: {
        mappings: {
            exporter: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                _meta: {
                    refs: {
                        entity: 'entity',
                        pipeline: 'pipeline',
                    },
                },
                properties: {
                    type: {
                        type: 'keyword',
                    },
                    entity: {
                        type: 'keyword',
                    },
                    pipeline: {
                        type: 'keyword',
                    },
                    query: {
                        type: 'object',
                    },
                },
            },
        },
    },
};
