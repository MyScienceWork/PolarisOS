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
                            importer: 'importer',
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
                            importer: {
                                type: 'keyword',
                            },
                            range: {
                                properties: {
                                    enabled: {
                                        type: 'boolean',
                                    },
                                    start: {
                                        type: 'integer',
                                    },
                                    end: {
                                        type: 'integer',
                                    },
                                    step: {
                                        type: 'integer',
                                    },
                                },
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
                                    ajax_path: {
                                        type: 'keyword',
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
                                    form: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    form_paths: {
                                        properties: {
                                            get: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                            delete: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                            post: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                            put: {
                                                type: 'keyword',
                                                index: false,
                                            },
                                        },
                                    },
                                    action_text: {
                                        type: 'text',
                                        index: false,
                                    },
                                    help_text: {
                                        type: 'text',
                                        index: false,
                                    },
                                    header_text: {
                                        type: 'text',
                                        index: false,
                                    },
                                    sort: {
                                        type: 'text',
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
                                    url_name: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    master_name: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                    keep: {
                                        type: 'boolean',
                                        index: false,
                                    },
                                    restore: {
                                        type: 'boolean',
                                        index: false,
                                    },
                                    keeper_sink: {
                                        type: 'keyword',
                                        index: false,
                                    },
                                },
                            },
                            required: {
                                type: 'boolean',
                                index: false,
                            },
                            help: {
                                properties: {
                                    content: {
                                        type: 'text',
                                        index: false,
                                    },
                                    use_modal: {
                                        type: 'boolean',
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
