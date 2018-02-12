module.exports = {
    msw: {
        mappings: {
            importer: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                _meta: {
                    refs: {
                        entity: 'entity',
                        pipeline: 'pipeline',
                        connector: 'connector',
                    },
                },
                properties: {
                    name: {
                        type: 'keyword',
                    },
                    type: {
                        type: 'keyword',
                    },
                    connector: {
                        type: 'keyword',
                    },
                    entity: {
                        type: 'keyword',
                    },
                    pipeline: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
