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

module.exports = {
    msw: {
        mappings: {
            workflow: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    global_access: {
                        properties: {
                            access: {
                                type: 'keyword',
                            },
                            subaccess: Access,
                        },
                    },
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
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    steps: {
                        type: 'nested',
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
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            order: {
                                type: 'integer',
                            },
                            roles: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            entity: {
                                type: 'keyword',
                            },
                            filter: {
                                type: 'text',
                                fields: {
                                    raw: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            entity_state: {
                                type: 'keyword',
                            },
                            state_before: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            state_after: {
                                type: 'nested',
                                properties: {
                                    _id: {
                                        type: 'keyword',
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
