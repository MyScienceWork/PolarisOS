const Access = {
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
};

const Slot = {
    enabled: {
        type: 'boolean',
    },
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
                    offset: {
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
                    access: Access,
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
                _meta: {
                    refs: {
                        header: {
                            rows: {
                                widgets: {
                                    _id: 'widget',
                                },
                            },
                        },
                        main: {
                            rows: {
                                widgets: {
                                    _id: 'widget',
                                },
                            },
                        },
                        footer: {
                            rows: {
                                widgets: {
                                    _id: 'widget',
                                },
                            },
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
                    template: {
                        type: 'keyword',
                    },
                    route: {
                        type: 'keyword',
                    },
                    global_access: {
                        properties: {
                            access: {
                                type: 'keyword',
                            },
                            subaccess: Access,
                        },
                    },
                    has_menu: {
                        type: 'boolean',
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
