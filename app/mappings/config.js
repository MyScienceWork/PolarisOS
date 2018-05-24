module.exports = {
    msw: {
        mappings: {
            config: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                properties: {
                    environment: {
                        type: 'keyword',
                    },
                    base_url: {
                        type: 'keyword',
                    },
                    gui: {
                        properties: {
                            logo: {
                                type: 'keyword',
                            },
                        },
                    },
                    mail: {
                        properties: {
                            smtp: {
                                properties: {
                                    host: {
                                        type: 'keyword',
                                    },
                                    port: {
                                        type: 'integer',
                                    },
                                    secure: {
                                        type: 'boolean',
                                    },
                                    auth: {
                                        properties: {
                                            user: {
                                                type: 'keyword',
                                            },
                                            pass: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    upload: {
                        properties: {
                            maxFileSizeInMB: {
                                type: 'half_float',
                                index: false,
                            },
                            allowRemoveFiles: {
                                type: 'boolean',
                                index: false,
                            },
                            acceptedFileTypes: {
                                type: 'keyword',
                                index: false,
                            },
                        },
                    },
                    langs: {
                        type: 'nested',
                        properties: {
                            value: {
                                type: 'keyword',
                            },
                        },
                    },
                    authentication: {
                        properties: {
                            default_cas_sso: {
                                type: 'boolean',
                            },
                            default_assigned_role: {
                                type: 'keyword',
                            },
                            use_cas_sso: {
                                type: 'boolean',
                            },
                            use_ldap: {
                                type: 'boolean',
                            },
                            cas_sso: {
                                properties: {
                                    service: {
                                        type: 'keyword',
                                    },
                                    base: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            ldap: {
                                properties: {
                                    base: {
                                        type: 'keyword',
                                    },
                                    dns: {
                                        type: 'keyword',
                                    },
                                    attributes: {
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
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
