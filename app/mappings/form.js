const _ = require('lodash');

const APIMapping = {
    protocol: { type: 'keyword', index: false },
    hostname: { type: 'keyword', index: false },
    port: { type: 'integer', index: false },
    pathname: { type: 'keyword', index: false },
    search: { type: 'keyword', index: false },
    type: { type: 'keyword', index: false }, // Method: POST, GET, PUT, DELETE
    params: {
        type: 'nested',
        properties: {
            key: { type: 'keyword', index: false },
            value: { type: 'keyword', index: false },
        },
    },
    headers: {
        type: 'nested',
        properties: {
            key: { type: 'keyword', index: false },
            value: { type: 'keyword', index: false },
        },
    },
    authorization: {
        properties: {
            enabled: { type: 'boolean', index: false },
            key: { type: 'keyword', index: false },
            secret: { type: 'keyword', index: false },
            template: { type: 'keyword', index: false },
        },
    },
    signature: {
        properties: {
            enabled: { type: 'boolean', index: false },
            template: { type: 'keyword', index: false },
            method: { type: 'keyword', index: false },
        },
    },
    timestamp: {
        properties: {
            enabled: { type: 'boolean', index: false },
            format: { type: 'keyword', index: false },
            name: { type: 'keyword', index: false },
        },
    },
};

module.exports = {
    msw: {
        mappings: {
            form: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    name: {
                        type: 'keyword',
                    },
                    label: {
                        type: 'text',
                        index: false,
                    },
                    description: {
                        type: 'text',
                        index: false,
                    },
                    parents: {
                        type: 'nested',
                        properties: {
                            name: {
                                type: 'keyword',
                            },
                        },
                    },
                    group: {
                        type: 'keyword',
                    },
                    addons: {
                        type: 'boolean',
                        index: false,
                    },
                    has_subforms: {
                        type: 'boolean',
                    },
                    post_path: {
                        properties: _.merge({}, APIMapping),
                    },
                    get_path: {
                        properties: _.merge({}, APIMapping),
                    },
                    remove_path: {
                        properties: _.merge({}, APIMapping),
                    },
                    put_path: {
                        properties: _.merge({}, APIMapping),
                    },
                    fields: {
                        type: 'nested',
                        properties: {
                            label: {
                                type: 'keyword',
                                index: false,
                            },
                            hiddenValue: {
                                type: 'keyword',
                                index: false,
                            },
                            placeholder: {
                                type: 'keyword',
                                index: false,
                            },
                            type: {
                                type: 'keyword',
                                index: false,
                            },
                            subform: {
                                type: 'keyword',
                            },
                            datasource: {
                                type: 'nested',
                                properties: {
                                    name: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    label: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    value: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    ajax: {
                                        type: 'boolean',
                                        index: false,

                                    },
                                    translatable: {
                                        type: 'boolean',
                                        index: false,

                                    },
                                    add: {
                                        type: 'boolean',
                                        index: false,
                                    },
                                    modify: {
                                        type: 'boolean',
                                        index: false,
                                    },
                                    remove: {
                                        type: 'boolean',
                                        index: false,
                                    },
                                },
                            },
                            name: {
                                type: 'keyword',
                                index: false,
                            },
                            validations: {
                                properties: {
                                    required: {
                                        type: 'boolean',
                                    },
                                    type: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                },
                            },
                            order: {
                                type: 'integer',
                                index: false,
                            },
                            multiple: {
                                type: 'boolean',
                                index: false,
                            },
                            single_multiple: {
                                type: 'boolean',
                                index: false,
                            },
                            multiple_name: {
                                type: 'keyword',
                                index: false,
                            },
                        },
                    },
                },
            },
        },
    },
};
