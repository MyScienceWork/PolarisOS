module.exports = {
    msw: {
        mappings: {
            entity: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                _meta: {
                    refs: {
                        form: 'form',
                        pipeline: 'pipeline',
                    },
                },
                properties: {
                    type: {
                        type: 'keyword',
                    },
                    form: {
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
