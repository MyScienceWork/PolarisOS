const Slot = {
    rows: {
        type: 'nested',
        properties: {
            widgets: {
                type: 'nested',
                properties: {
                    begin_span: {
                        type: 'byte',
                    },
                    end_span: {
                        type: 'byte',
                    },
                    _id: {
                        type: 'keyword',
                    },
                    variables: {
                        type: 'nested',
                        properties: {
                            name: { type: 'keyword' },
                            value: { type: 'keyword' },
                        },
                    },
                    texts: {
                        type: 'nested',
                        properties: {
                            name: { type: 'keyword' },
                            value: { type: 'keyword' },
                        },
                    },
                    access: {
                        properties: {
                            c: {
                                type: 'boolean',
                            },
                            r: {
                                type: 'boolean',
                            },
                            u: {
                                type: 'boolean',
                            },
                            d: {
                                type: 'boolean',
                            },
                        },
                    },
                },
            },
        },
    },
};

module.exports = {
    msw: {
        mappings: {
            page: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    template: {
                        type: 'keyword',

                    },
                    header: {
                        properties: Slot,
                    },
                    main: {
                        properties: Slot,
                    },
                    footer: {
                        properties: Slot,
                    },
                },
            },
        },
    },
};
