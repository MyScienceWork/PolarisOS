module.exports = {
    msw: {
        mappings: {
            typology: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    label: {
                        type: 'keyword',
                    },
                    children: {
                        type: 'nested',
                        properties: {
                            label: {
                                type: 'keyword',
                            },
                            name: {
                                type: 'keyword',
                            },
                            form: {
                                type: 'keyword',
                            },
                            file: {
                                type: 'boolean',
                            },
                            completable: {
                                type: 'boolean',
                            },
                            ids: {
                                type: 'nested',
                                properties: {
                                    value: {
                                        type: 'keyword',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
