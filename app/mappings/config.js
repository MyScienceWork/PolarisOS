module.exports = {
    msw: {
        mappings: {
            config: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    environment: {
                        type: 'keyword',
                    },
                    upload: {
                        properties: {
                            maxFileSizeInMB: {
                                type: 'half_float',
                                index: false,
                            },
                            allowRemoveFiles: {
                                type: 'boolean',
                                index: false,
                            },
                            acceptedFileTypes: {
                                type: 'keyword',
                                index: false,
                            },
                        },
                    },
                    langs: {
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
};
