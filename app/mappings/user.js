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
                        author: 'author',
                    },
                },
                properties: {
                    created_at: {
                        type: 'date',
                    },
                    updated_at: {
                        type: 'date',
                    },
                    last_connection_at: {
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
                    uid: {
                        type: 'keyword',
                    },
                    enabled: {
                        type: 'boolean',
                    },
                    public_profile: {
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
                    sso: {
                        type: 'boolean',
                    },
                    ldap: {
                        type: 'boolean',
                    },
                    firstname: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    fullname: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    lastname: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    about_me: {
                        type: 'text',
                    },
                    author: {
                        type: 'keyword',
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
                    identifiers: {
                        type: 'nested',
                        properties: {
                            type: {
                                type: 'keyword',
                            },
                            value: {
                                type: 'keyword',
                            },
                        },
                    },
                    ids: {
                        properties: {
                            twitter: {
                                type: 'keyword',
                            },
                            linkedin: {
                                type: 'keyword',
                            },
                            orcid: {
                                type: 'keyword',
                            },
                            facebook: {
                                type: 'keyword',
                            },
                            hal: {
                                type: 'keyword',
                            },
                            idref: {
                                type: 'keyword',
                            },
                            pubmedid: {
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
                    preferred_language: {
                        type: 'keyword',
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
