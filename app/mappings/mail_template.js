module.exports = {
    msw: {
        mappings: {
            dynamic: 'strict',
            dynamic_date_formats: [],
            properties: {
                name: {
                    type: 'text',
                    fields: {
                        raw: {
                            type: 'keyword',
                        },
                    },
                },
                id: {
                    type: 'keyword',
                },
                recipients: {
                    type: 'nested',
                    properties: {
                        entity: {
                            type: 'keyword',
                        },
                        matches: {
                            type: 'nested',
                            properties: {
                                key: {
                                    type: 'keyword',
                                },
                                value: {
                                    type: 'keyword',
                                },
                                type: {
                                    type: 'keyword',
                                },
                                length: {
                                    type: 'integer',
                                },
                            },
                        },
                    },
                },
                trigger: {
                    properties: {
                        entity: {
                            type: 'keyword',
                        },
                        matches: {
                            type: 'nested',
                            properties: {
                                key: {
                                    type: 'keyword',
                                },
                                value: {
                                    type: 'keyword',
                                },
                                type: {
                                    type: 'keyword',
                                },
                                length: {
                                    type: 'integer',
                                },
                            },
                        },
                    },
                },
                subject: {
                    type: 'text',
                    fields: {
                        raw: {
                            type: 'keyword',
                        },
                    },
                },
                body: {
                    type: 'text',
                    fields: {
                        raw: {
                            type: 'keyword',
                        },
                    },
                },
            },
        },
    },
};
