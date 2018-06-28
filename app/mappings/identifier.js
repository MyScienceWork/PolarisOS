module.exports = {
    msw: {
        mappings: {
            identifier: {
                dynamic: 'false',
                dynamic_date_formats: [],
                properties: {
                    label: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    type: {
                        type: 'keyword',
                    },
                    system: {
                        properties: {
                            locked: {
                                type: 'boolean',
                            },
                            valid: {
                                type: 'boolean',
                            },
                        },
                    },
                    value: {
                        type: 'keyword',

                    },
                },
            },
        },
    },
};
