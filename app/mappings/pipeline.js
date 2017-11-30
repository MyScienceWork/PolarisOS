module.exports = {
    msw: {
        mappings: {
            pipeline: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    entity: {
                        type: 'keyword',
                    },
                    defaults: {
                        type: 'nested',
                        properties: {
                            key: {
                                type: 'keyword',
                            },
                            value: {
                                type: 'keyword',
                            },
                        },
                    },
                    formatters: {
                        type: 'nested',
                        properties: {
                            function: {
                                properties: {
                                    name: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                },
                            },
                        },
                    },
                    completers: {
                        type: 'nested',
                        properties: {
                            function: {
                                properties: {
                                    name: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                },
                            },
                        },
                    },
                    transformers: {
                        type: 'nested',
                        properties: {
                            input: {
                                type: 'keyword',
                                index: false,
                            },
                            rules: {
                                type: 'nested',
                                properties: {

                                },
                            },
                            output: {
                                type: 'keyword',
                                index: 'false',
                            },
                        },
                    },
                },
            },
        },
    },
};
