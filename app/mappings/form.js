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
                    group: {
                        type: 'keyword',
                    },
                    has_subforms: {
                        type: 'boolean',
                    },
                    post_path: {
                        type: 'keyword',
                    },
                    get_path: {
                        type: 'keyword',
                    },
                    remove_path: {
                        type: 'keyword',
                    },
                    put_path: {
                        type: 'keyword',
                    },
                    fields: {
                        type: 'nested',
                        properties: {
                            label: {
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
