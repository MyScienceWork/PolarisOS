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
                    mail: {
                        properties: {
                            smtp: {
                                properties: {
                                    host: {
                                        type: 'keyword',
                                    },
                                    port: {
                                        type: 'integer',
                                    },
                                    secure: {
                                        type: 'boolean',
                                    },
                                    auth: {
                                        properties: {
                                            user: {
                                                type: 'keyword',
                                            },
                                            pass: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                        },
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
