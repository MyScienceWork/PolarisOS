const FunctionMapping = {
    properties: {
        name: {
            type: 'keyword',
            index: false,
        },
        arguments: {
            type: 'nested',
            properties: {
                name: {
                    type: 'keyword',
                    index: false,

                },
                value: {
                    type: 'keyword',
                    index: false,

                },
            },
        },
    },
};

module.exports = {
    msw: {
        mappings: {
            pipeline: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    name: {
                        type: 'keyword',
                    },
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
                            function: FunctionMapping,
                        },
                    },
                    completers: {
                        type: 'nested',
                        properties: {
                            function: FunctionMapping,
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
