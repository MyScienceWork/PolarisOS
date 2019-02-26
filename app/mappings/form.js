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
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    label: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    description: {
                        type: 'text',
                    },
                    addons: {
                        type: 'boolean',
                    },
                    has_subforms: {
                        type: 'boolean',
                    },
                    fields: {
                        type: 'nested',
                        properties: {
                            label: {
                                type: 'keyword',
                            },
                            hiddenValue: {
                                type: 'keyword',
                            },
                            placeholder: {
                                type: 'keyword',
                            },
                            type: {
                                type: 'keyword',
                            },
                            readonly: {
                                type: 'boolean',
                            },
                            subform: {
                                type: 'keyword',
                            },
                            subform_information: {
                                properties: {
                                    type: {
                                        type: 'keyword',
                                    },
                                    title: {
                                        type: 'text',
                                    },
                                },
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
                                    sort: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            datasource: {
                                type: 'nested',
                                properties: {
                                    name: {
                                        type: 'keyword',
                                    },
                                    sink: {
                                        type: 'keyword',
                                    },
                                    fetch_from_sink: {
                                        type: 'boolean',
                                    },
                                    info_in_sink: {
                                        type: 'keyword',
                                    },
                                    label: {
                                        type: 'keyword',
                                    },
                                    value: {
                                        type: 'keyword',
                                    },
                                    ajax: {
                                        type: 'boolean',
                                    },
                                    ajax_path: {
                                        type: 'keyword',
                                    },
                                    ajax_value_path: {
                                        type: 'keyword',
                                    },
                                    translatable: {
                                        type: 'boolean',
                                    },
                                    use_hlang: {
                                        type: 'boolean',
                                    },
                                    add: {
                                        type: 'boolean',
                                    },
                                    modify: {
                                        type: 'boolean',
                                    },
                                    remove: {
                                        type: 'boolean',
                                    },
                                    form: {
                                        type: 'keyword',
                                    },
                                    form_paths: {
                                        properties: {
                                            get: {
                                                type: 'keyword',
                                            },
                                            delete: {
                                                type: 'keyword',
                                            },
                                            post: {
                                                type: 'keyword',
                                            },
                                            put: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    action_text: {
                                        type: 'text',
                                    },
                                    help_text: {
                                        type: 'text',
                                    },
                                    header_text: {
                                        type: 'text',
                                    },
                                    sort: {
                                        type: 'text',
                                    },
                                    search_fields: {
                                        type: 'keyword',
                                    },
                                    size: {
                                        type: 'integer',
                                    },
                                    query: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            name: {
                                type: 'keyword',
                            },
                            order: {
                                type: 'integer',
                            },
                            multiple: {
                                type: 'boolean',
                            },
                            single_multiple: {
                                type: 'boolean',
                            },
                            multiple_name: {
                                type: 'keyword',
                            },
                            file: {
                                properties: {
                                    file_name: {
                                        type: 'keyword',
                                    },
                                    url_name: {
                                        type: 'keyword',
                                    },
                                    master_name: {
                                        type: 'keyword',
                                    },
                                    keep: {
                                        type: 'boolean',
                                    },
                                    restore: {
                                        type: 'boolean',
                                    },
                                    keeper_sink: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            dynamic_list: {
                                properties: {
                                    dns: {
                                        type: 'keyword',
                                    },
                                    port: {
                                        type: 'keyword',
                                    },
                                    uri: {
                                        type: 'keyword',
                                    },
                                    method: {
                                        type: 'keyword',
                                    },
                                    selected_mapping: {
                                        type: 'keyword',
                                    },
                                    send_payload: {
                                        type: 'nested',
                                        properties: {
                                            value: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    result_table: {
                                        type: 'nested',
                                        properties: {
                                            value: {
                                                type: 'keyword',
                                            },
                                            label: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                    result_mapping: {
                                        type: 'nested',
                                        properties: {
                                            value_payload: {
                                                type: 'keyword',
                                            },
                                            value_form: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                            required: {
                                type: 'boolean',
                            },
                            help: {
                                properties: {
                                    content: {
                                        type: 'text',
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
