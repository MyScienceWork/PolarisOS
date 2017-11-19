module.exports = {
    msw: {
        mappings: {
            journal: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    abbreviation: {
                        type: 'keyword',
                        index: false,
                    },
                    copyright: {
                        type: 'text',
                        index: false,
                    },
                    mid: {
                        type: 'keyword',
                    },
                    ids: {
                        type: 'nested',
                        properties: {
                            type: {
                                type: 'keyword',
                            },
                            value: {
                                type: 'keyword',
                            },
                            master: {
                                type: 'boolean',
                            },
                        },
                    },
                    name: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    publisher: {
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
    },
};
