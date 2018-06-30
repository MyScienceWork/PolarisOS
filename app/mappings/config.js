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
                            css_template: {
                                type: 'keyword',
                            },
                            cover_page: {
                                type: 'keyword',
                            },
                        },
                    },
                    api: {
                        properties: {
                            hal: {
                                properties: {
                                    enabled: {
                                        type: 'boolean',
                                    },
                                    url: {
                                        type: 'keyword',
                                    },
                                    login: {
                                        type: 'keyword',
                                    },
                                    password: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            handle: {
                                properties: {
                                    enabled: {
                                        type: 'boolean',
                                    },
                                    ip: {
                                        type: 'keyword',
                                    },
                                    port: {
                                        type: 'integer',
                                    },
                                    admin_handle: {
                                        type: 'keyword',
                                    },
                                    admin_password: {
                                        type: 'keyword',
                                    },
                                    prefix: {
                                        type: 'keyword',
                                    },
                                    proxy: {
                                        type: 'keyword',
                                    },
                                },
                            },
                            google: {
                                properties: {
                                    sitemap: {
                                        properties: {
                                            enabled: {
                                                type: 'boolean',
                                            },

                                            interval: {
                                                type: 'integer',
                                            },
                                            next_generation: {
                                                type: 'date',
                                            },

                                        },
                                    },
                                },
                            },
                        },
                    },
                    mail: {
                        properties: {
                            enabled: {
                                type: 'boolean',
                            },
                            default_sender: {
                                type: 'keyword',
                            },
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
