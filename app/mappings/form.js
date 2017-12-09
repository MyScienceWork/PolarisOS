const _ = require('lodash');

module.exports = {
    msw: {
        mappings: {
            form: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                _meta: {
                    refs: {
                        fields: {
                            subform: 'form',
                        },
                    },
                },
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
                    addons: {
                        type: 'boolean',
                        index: false,
                    },
                    has_subforms: {
                        type: 'boolean',
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
                            file: {
                                properties: {
                                    file_name: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    master_name: {
                                        type: 'keyword',
                                        index: false,
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
