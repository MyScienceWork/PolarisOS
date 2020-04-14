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
                type: {
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
                filters: {
                    type: 'nested',
                    properties: {
                        value: {
                            type: 'keyword',
                        },
                    },
                },
                resetters: {
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
                        },
                        function: FunctionMapping,
                    },
                },
                completers: {
                    type: 'nested',
                    properties: {
                        field: {
                            type: 'keyword',
                        },
                        function: FunctionMapping,
                    },
                },
                transformers: {
                    type: 'nested',
                    properties: {
                        input: {
                            type: 'keyword',
                        },
                        rules: {
                            type: 'nested',
                            properties: {

                            },
                        },
                        output: {
                            type: 'keyword',
                        },
                    },
                },
                validators: {
                    type: 'nested',
                    properties: {
                        field: {
                            type: 'keyword',
                        },
                        type: {
                            type: 'keyword',
                        },
                        required: {
                            type: 'boolean',
                        },
                        function: FunctionMapping,
                    },
                },
            },
        },
    },
};
