module.exports = {
    msw: {
        mappings: {
            field: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    label: {
                        type: 'text',
                        index: false,
                    },
                    type: {
                        type: 'keyword',
                        index: false,
                    },
                    datasource: {
                        type: 'keyword',
                        index: false,
                    },
                    name: {
                        type: 'keyword',
                        index: false,
                    },
                    validations: {
                        type: 'nested',
                        properties: {
                            required: {
                                type: 'boolean',
                            },
                            type: {
                                type: 'keyword',
                                index: false,
                            },

                        },
                    },
                    parent_form: {
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
