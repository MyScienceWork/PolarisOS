module.exports = {
    msw: {
        mappings: {
            user: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                _meta: {
                    refs: {
                        roles: {
                            _id: 'role',
                        },
                    },
                },
                properties: {
                    created_at: {
                        type: 'date',
                    },
                    updated_at: {
                        type: 'date',
                    },
                    emails: {
                        type: 'nested',
                        properties: {
                            email: {
                                type: 'keyword',
                            },
                            master: {
                                type: 'boolean',
                            },
                        },
                    },
                    enabled: {
                        type: 'boolean',
                    },
                    locked: {
                        type: 'boolean',
                    },
                    force_deconnection: {
                        type: 'boolean',
                    },
                    password: {
                        type: 'keyword',
                    },
                    firstname: {
                        type: 'text',
                        fields: {
                            firstname: {
                                type: 'text',
                                analyzer: 'text_analyzer',
                                search_analyzer: 'search_analyzer',
                            },
                            raw: {
                                type: 'keyword',
                            },
                        },
                        fielddata: true,
                    },
                    fullname: {
                        type: 'text',
                        analyzer: 'text_analyzer',
                        search_analyzer: 'search_analyzer',
                    },
                    lastname: {
                        type: 'text',
                        fields: {
                            lastname: {
                                type: 'text',
                                analyzer: 'text_analyzer',
                                search_analyzer: 'search_analyzer',
                            },
                            raw: {
                                type: 'keyword',
                            },
                        },
                        fielddata: true,
                    },
                    authentication: {
                        properties: {
                            key: {
                                type: 'keyword',
                            },
                            secret: {
                                type: 'keyword',
                            },
                        },
                    },
                    roles: {
                        type: 'nested',
                        properties: {
                            _id: {
                                type: 'keyword',
                            },
                        },
                    },
                    access: {
                        type: 'nested',
                        properties: {
                            whitelists: {
                                type: 'nested',
                                properties: {
                                    entity: {
                                        type: 'keyword',
                                    },
                                    id: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            blacklists: {
                                type: 'nested',
                                properties: {
                                    entity: {
                                        type: 'keyword',
                                    },
                                    id: {
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
