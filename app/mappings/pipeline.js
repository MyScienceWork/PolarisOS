const _ = require('lodash');

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
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
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
                            field: {
                                type: 'keyword',
                                index: false,
                            },
                            function: FunctionMapping,
                        },
                    },
                    completers: {
                        type: 'nested',
                        properties: {
                            field: {
                                type: 'keyword',
                                index: false,
                            },
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
                    validators: {
                        type: 'nested',
                        properties: {
                            field: {
                                type: 'keyword',
                                index: false,
                            },
                            type: {
                                type: 'keyword',
                                index: false,
                            },
                            required: {
                                type: 'boolean',
                                index: false,
                            },
                            function: FunctionMapping,
                        },
                    },
                },
            },
        },
    },
};
