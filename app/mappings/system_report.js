module.exports = {
    msw: {
        mappings: {
            system_report: {
                dynamic: 'strict',
                dynamic_date_formats: [],
                _meta: {
                    refs: {
                        requester: 'user',
                    },
                },
                properties: {
                    denormalization: {
                        properties: {
                            requester: {
                                properties: {
                                    fullname: {
                                        type: 'text',
                                        fields: {
                                            raw: {
                                                type: 'keyword',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    created_at: {
                        type: 'date',
                    },
                    name: {
                        type: 'text',
                        fields: {
                            raw: {
                                type: 'keyword',
                            },
                        },
                    },
                    requester: {
                        type: 'keyword',
                    },
                    schedule_at: {
                        type: 'date',
                    },
                    differed: {
                        type: 'boolean',
                    },
                    type: {
                        type: 'keyword',
                    },
                    subtype: {
                        type: 'keyword',
                    },
                    format: {
                        type: 'keyword',
                    },
                    external_information: {
                        type: 'keyword',
                    },
                    filepath: {
                        type: 'keyword',
                    },
                    status: {
                        type: 'keyword',
                    },
                    result: {
                        type: 'keyword',
                        index: false,
                    },
                    report: {
                        properties: {
                            total: {
                                type: 'long',
                            },
                            success: {
                                type: 'long',
                            },
                            errors: {
                                type: 'long',
                            },
                        },
                    },
                },
            },
        },
    },
};
