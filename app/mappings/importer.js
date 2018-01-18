module.exports = {
    msw: {
        mappings: {
            importer: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                _meta: {
                    refs: {
                        form: 'form',
                        entity: 'entity',
                        pipeline: 'pipeline',
                    },
                },
                properties: {
                    form: {
                        type: 'keyword',
                    },
                    type: {
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
