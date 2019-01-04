module.exports = {
    msw: {
        mappings: {
            workflow: {
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
                    steps: {
                        type: 'nested',
                        properties: {
                            name: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            role: {
                                type: 'keyword',
                            },
                            entity: {
                                type: 'keyword',
                            },
                            filter: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            state_before: {
                                type: 'nested',
                                properties: {
                                    state: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            state_after: {
                                type: 'nested',
                                properties: {
                                    state: {
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
